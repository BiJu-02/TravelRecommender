from flask import Flask

from waitress import serve
import os

from jwt_config import init_jwt
from db_config import init_db

from routes import test, auth, travel

app = Flask(__name__)

init_jwt(app)
init_db()

app.register_blueprint(test.bp)
app.register_blueprint(auth.bp)

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=4000)

