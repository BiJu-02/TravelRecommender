from flask import Flask

from waitress import serve
import os
import logging

from jwt_config import init_jwt
from db_config import init_db


app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

init_jwt(app)

init_db()

from routes import test, auth, travel

app.register_blueprint(test.bp)
app.register_blueprint(auth.bp)
app.register_blueprint(travel.bp)

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=4000)

