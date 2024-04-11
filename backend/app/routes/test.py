from flask import Blueprint

bp = Blueprint("hello_bp", __name__)

@bp.route("/")
def hello():
    return "hello from flask app"