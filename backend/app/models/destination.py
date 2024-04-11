from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash
import logging

logger = logging.getLogger(__name__)

class Destination:

    @staticmethod
    def find_by_index(idx):
        coll = db["destinationsData"]
        projection = {
            "destination_name": { "$slice": [idx, 1] },
            "destination_type": { "$slice": [idx, 1] },
            "activities": { "$slice": [idx, 1] },
        }
        data = coll.find_one({}, projection)
        logger.info(f"data: {data}")
        return {"place1": "name"}

    @staticmethod
    def find_by_similar_name(name_str):
        pass

