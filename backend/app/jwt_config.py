from flask_jwt_extended import JWTManager
from utils.crypto import generate_key

jwt = None

def init_jwt(app):
    global jwt
    app.config["JWT_SECRET_KEY"] = generate_key()
    jwt = JWTManager(app)