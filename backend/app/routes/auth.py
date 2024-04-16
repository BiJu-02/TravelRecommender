from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

from models.user import User

bp = Blueprint("auth_bp", __name__)

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    temp = User.get_user(data["email"])
    if temp:
        return jsonify({"msg": "User with this email already exists"}), 409
    user = User(
        email=data["email"],
        passhash=generate_password_hash(data["password"])
    )
    user.save()
    return {"msg": "User registered successfully"}, 201


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.get_user(data["email"])
    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user["email"])
    return {"msg": "Logged in successfull", "access_token": access_token}



