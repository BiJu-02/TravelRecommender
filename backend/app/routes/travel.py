from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models.destination import Destination

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
    # get current_user data from db, prepare weights and run recommendation engine(ann index search)
    data = Destination.find_by_index(2)
    result = "place_name"

    return {"data": data}, 200



# for testing jwt
@bp.route("/protected")
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    return f"protected route works {current_user_email}", 200
