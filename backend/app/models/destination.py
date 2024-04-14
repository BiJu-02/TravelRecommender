from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash
import logging
import re

logger = logging.getLogger(__name__)

class Destination:

    @staticmethod
    def find_by_index(idx):
        projection = {
            "destination_name": { "$slice": [idx, 1] },
            "destination_type": { "$slice": [idx, 1] },
            "activities": { "$slice": [idx, 1] },
        }
        data = db.destinationsData.find_one({}, projection)
        return data


    @staticmethod
    def find_by_name(name_str):
        projection = {
            "destination_type": {
                "$arrayElemAt": ["$destination_type", {"$indexOfArray": ["$destination_name", name_str]}]
            },
            "activities": {
                "$arrayElemAt": ["$activities", {"$indexOfArray": ["$destination_name", name_str]}]
            }
        }

        result = db.destinationsData.find_one(
            {"destination_name": name_str},
            projection
        )

        if result:
            return {
                "destination_name": name_str,
                "destination_type": result["destination_type"],
                "activities": result["activities"]
            }
        else:
            return {}


    @staticmethod
    def find_by_similar_name(name_str):
        name_str = re.escape(name_str)
        regex = re.compile(f'.*{name_str}.*', re.IGNORECASE)
        destinations = db.destinationsData.find_one(
            {},
            {'_id': 0, 'destination_name': 1}
        )
        destination_names = [name for name in destinations['destination_name'] if regex.match(name)]
        return destination_names


    # data = { "unique_destination_types": ["t1", "t2", ...], "unique_activities": ["a1", "a2", ...] }
    @staticmethod
    def add_unique_labels(data):
        result = db.destinationsData.insert_one(data)


    @staticmethod
    def get_unique_labels():
        result = db.destinationsData.find_one({"unique_activities": {"$exists": True}})
        if result is None:
            return None
        return result


