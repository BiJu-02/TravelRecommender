from flask import Flask

from waitress import serve
import os
import json
import logging

from jwt_config import init_jwt
from db_config import init_db


app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

init_jwt(app)
with open("./db_init_data/data.json", "r") as file:
    data = json.load(file)
    init_db(data)
    from recom_engine import init_recom_index
    init_recom_index(data)

from routes import test, auth, travel, destination

app.register_blueprint(test.bp)
app.register_blueprint(auth.bp)
app.register_blueprint(travel.bp)
app.register_blueprint(destination.bp)

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=4000)

