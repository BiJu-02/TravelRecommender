from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash
import logging

logger = logging.getLogger(__name__)

class User:
    def __init__(self, email, password, password_hashed=False):
        self.email = email
        # If the password is already hashed, don't hash it again
        if not password_hashed:
            self.password = generate_password_hash(password)
        else:
            self.password = password


    def save(self):
        user_data = {
            "email": self.email,
            "password": self.password
        }
        db.users.insert_one(user_data)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    # pref = [ { "destination_name": "p1", "destination_type": "t1", "activities": ["a1", "a2"] }, ... ]
    @staticmethod
    def add_prefs(email, prefs):
        result = db.users.update_one(
            {"email": email},
            {"$set": {"prefs": prefs}}
        )
        if result.matched_count > 0:
            logger.info("prefs updated successfully")
            return True
        else:
            logger.info("no document match found for update")
            return False


    # pref = { "destination_name": "Paris", "destination_type": "City", "activities": ["a1", "a2"] }
    @staticmethod
    def add_pref(email, pref):
        result = db.users.update_one(
            {"email": email},
            {"$push": {"prefs": pref}}
        )
        if result.matched_count > 0:
            logger.info("prefs updated successfully")
            return True
        else:
            logger.info("no document match found for update")
            return False


    # pref = { "destination_name": "Maldives"}
    @staticmethod
    def remove_pref(email, pref):
        result = db.users.update_one(
            {"email": email},  # Filter to match the document to update
            {"$pull": {"prefs": pref}}  # Remove the matching preference from the prefs array
        )
        if result.matched_count > 0:
            logger.info("prefs updated successfully")
            return True
        else:
            logger.info("no document match found for update")
            return False


    @staticmethod
    def get_prefs(email):
        result = db.users.find_one({"email": email})
        if result["prefs"] is None:
            return []
        return result.get("prefs", [])


    @staticmethod
    def find_one(user_data):
        user_dict = db.users.find_one(user_data) 
        if user_dict is None:
            return None
        # Initialize the User object with the hashed password
        return User(user_dict['email'], user_dict['password'], password_hashed=True)

