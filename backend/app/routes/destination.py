from flask import Blueprint, request
import logging

from models.destination import Destination

logger = logging.getLogger(__name__)

bp = Blueprint("destination_bp", __name__)

# route to provide search options for travel destination, when user types the destination name
@bp.route("/get-dest-name")
def get_dest_name():
    query = request.args.get("input", "")
    if query == "":
        return {"destination_list": []}, 200
    destination_list = Destination.find_by_similar_name(query)
    return {"desination_list": destination_list}, 200

# route for getting labels/tags of destination by name
@bp.route("/get-dest-tags/<destination_name>")
def get_dest_tags(destination_name):
    destination_data = Destination.find_by_name(destination_name)
    return destination_data, 200
