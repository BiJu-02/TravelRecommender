from flask_jwt_extended import JWTManager
from utils.crypto import generate_key
from datetime import timedelta

jwt = None

def init_jwt(app):
    global jwt
    app.config["JWT_SECRET_KEY"] = generate_key()
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=2)
    jwt = JWTManager(app)