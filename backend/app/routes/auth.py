from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

from models.user import User

bp = Blueprint("auth_bp", __name__)


# route for creating a new user and adding it in the db it the user already does not exist
@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user = User(
        email=data["email"],
        passhash=generate_password_hash(data["password"])
    )
    
    if not user.save():
        return jsonify({"msg": "User with this email already exists"}), 409

    return {"msg": "User registered successfully"}, 201


# route for authorizing the user by providing the user with JWT
@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.get_user(data["email"])
    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user["email"])
    return {"msg": "Logged in successfull", "access_token": access_token}



