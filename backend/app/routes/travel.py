from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models.destination import Destination

bp = Blueprint("travel_bp", __name__)

@bp.route("/addPref", methods=["POST"])
@jwt_required()
def add_pref():
    current_user_email = get_jwt_identity()
    # prepare weights and add to db

    return {"msg": "travel destination added successfully"}, 201

@bp.route("/recommend")
@jwt_required()
def recommend():
    current_user_email = get_jwt_identity()
    # get current_user data(preference vector) from db and run recommendation engine(ann index search)
    data = Destination.find_by_index(2)
    return {"recommendations": data}, 200


@bp.route("/protected")
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    return f"protected route works {current_user_email}", 200
