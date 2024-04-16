from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import User

from utils.ann import get_recommendations



bp = Blueprint("travel_bp", __name__)


@bp.route("/update-prefs", methods=["POST"])
@jwt_required()
def add_prefs():
    current_user_email = get_jwt_identity()
    post_data = request.json
    # validate post_data...check if name, type and activity is part of dataset

    if not User.update_prefs(current_user_email, post_data["prefs"]):
        return {"msg": "server error occured"}, 500
        
    return {"msg": "travel destination added successfully"}, 201


@bp.route("/get-prefs")
@jwt_required()
def get_prefs():
    current_user_email = get_jwt_identity()
    user = User.get_user(current_user_email)
    if user is None:
        return {"msg": "user with this email does not exist in db"}, 401

    return {"data": user.get("prefs", [])}, 200


@bp.route("/recommend")
@jwt_required()
def recommend():
    current_user_email = get_jwt_identity()
    user = User.get_user(current_user_email)
    if user is None:
        return {"msg": "user with this email does not exist in db"}, 401

    existing_recom = user.get("recoms", [])
    recom_changed = user.get("recom_changed", False)
    # if user exists and preferences have not changed send the already saved recommendations
    if not recom_changed and len(existing_recom) > 0:
        return {"data": existing_recom}, 200

    # get current_user preferences from db and run recommendation engine(ann index search)
    prefs = user.get("prefs", [])
    recom = get_recommendations(prefs)

    #saved in db in case the user asks for recommendations again without changing any preferences
    User.update_recoms(current_user_email, recom)

    return {"data": recom}, 200

