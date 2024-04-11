from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

from sklearn.preprocessing import normalize
import numpy as np
import faiss

from models.user import User
from models.destination import Destination

from utils.weights import preferences_to_weighted_scores

logger = logging.getLogger(__name__)

index_file_path = 'faiss_index.bin'
index = faiss.read_index(index_file_path)

bp = Blueprint("travel_bp", __name__)

@bp.route("/add-pref", methods=["POST"])
@jwt_required()
def add_pref():
    current_user_email = get_jwt_identity()
    post_data = request.json
    # validate post_data...check if name, type and activity is part of dataset

    if not User.add_pref(current_user_email, post_data):
        return {"msg": "server error occured"}, 500
    return {"msg": "travel destination added successfully"}, 201


@bp.route("/remove-pref", methods=["POST"])
@jwt_required()
def remove_pref():
    current_user_email = get_jwt_identity()
    post_data = request.json
    # validate post_data...check if name is part of dataset

    if not User.remove_pref(current_user_email, post_data):
        return {"msg": "server error occured"}, 500
    return {"msg": "travel destination removed successfully"}, 201 

@bp.route("/get-prefs")
@jwt_required()
def get_prefs():
    current_user_email = get_jwt_identity()
    result = User.get_prefs(current_user_email)
    return {"data": result}, 200


@bp.route("/recommend")
@jwt_required()
def recommend():
    current_user_email = get_jwt_identity()
    # get current_user data from db, prepare weights and run recommendation engine(ann index search)\

    prefs = User.get_prefs(current_user_email)
    # user_preferences = {
    #     'destination_type': ['Snow-Covered', 'Mountain', 'Snow-Covered', 'City'],
    #     'activities': ['Trekking', 'Mountaineering', 'Shopping']
    # }

    user_preferences = {
        'destination_type': [],
        'activities': []
    }

    for pref in prefs:
        for destination_type in pref["destination_type"]:
            user_preferences["destination_type"].append(destination_type)
        for activity in pref["activities"]:
            user_preferences["activities"].append(activity)
    
    # fetch this from db and assemble like this

    unique_labels = Destination.get_unique_labels()

    place_type_weights = preferences_to_weighted_scores(user_preferences['destination_type'], unique_labels["unique_destination_types"])
    activities_weights = preferences_to_weighted_scores(user_preferences['activities'], unique_labels["unique_activities"])

    combined_weights = np.hstack((place_type_weights, activities_weights))
    combined_weights_normalized = normalize(combined_weights.reshape(1, -1), norm='l1')

    k = 5  # Number of nearest neighbors to find
    D, I = index.search(combined_weights_normalized.astype(np.float32), k)
    logger.info(f"indices found: {I}")
    data = []
    for i in I[0]:
        result = Destination.find_by_index(int(i))
        data.append({
            "destination_name": result["destination_name"],
            "destination_type": result["destination_type"],
            "activities": result["activities"]
        })

    return {"data": data}, 200



# for testing jwt
@bp.route("/protected")
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    return f"protected route works {current_user_email}", 200
