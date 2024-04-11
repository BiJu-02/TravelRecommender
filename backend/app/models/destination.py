from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash
import logging

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
        logger.info(f"data: {data}")
        return data

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


    @staticmethod
    def find_by_similar_name(name_str):
        pass

