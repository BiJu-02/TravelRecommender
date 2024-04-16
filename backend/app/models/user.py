from pymongo import errors as mongo_errors
from db_config import db
import logging

logger = logging.getLogger(__name__)


# index for 
db.users.create_index("email", unique=True)

class User:
    def __init__(self, email, passhash):
        self.email = email
        self.passhash = passhash


    def save(self):
        user_data = {
            "email": self.email,
            "password": self.passhash
        }
        try:
            db.users.insert_one(user_data)
            return True
        except mongo_errors.DuplicateKeyError:
            return False
            

    @staticmethod
    def get_user(email):
        return db.users.find_one({"email": email})


    # prefs = [ { "destination_name": "p1", "destination_type": "t1", "activities": ["a1", "a2"] }, ... ]
    @staticmethod
    def update_prefs(email, prefs):
        result = db.users.update_one(
            {"email": email},
            {"$set": {"prefs": prefs, "recom_changed": True}}
        )
        if result.matched_count > 0:
            logger.info("prefs updated successfully")
            return True
        else:
            logger.info("(update_prefs)no document match found for update")
            return False


    # recoms = [ { "destination_name": "p1", "destination_type": "t1", "activities": ["a1", "a2"] }, ... ]
    @staticmethod
    def update_recoms(email, recoms):
        result = db.users.update_one(
            {"email": email},
            {"$set": {"recoms": recoms, "recom_changed": False}}
        )
        if result.matched_count > 0:
            logger.info("recoms updated successfully")
            return True
        else:
            logger.info("(update_recoms)no document match found for update")
            return False


