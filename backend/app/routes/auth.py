from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User

bp = Blueprint("auth_bp", __name__)

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    temp = User.find_one({"email": data["email"]})
    if temp:
        return jsonify({"msg": "User with this email already exists"}), 409
    user = User(
        email=data["email"],
        password=data["password"]
    )
    user.save()
    return {"msg": "User registered successfully"}, 201


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.find_one({"email": data["email"]})
    if not user or not user.check_password(data["password"]):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user.email)
    return {"msg": "Logged in successfull", "access_token": access_token}


@bp.route('/auth-check', methods=['GET'])
@jwt_required(optional=True)
def check_auth():
    current_user = get_jwt_identity()
    if current_user:
        return { "logged_in": True, "user": current_user }, 200
    else:
        return { "logged_in": False }, 200

