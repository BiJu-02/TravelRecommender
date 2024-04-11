from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash

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

    def add_pref(self):
        pass

    @staticmethod
    def find_one(user_data):
        user_dict = db.users.find_one(user_data) 
        if user_dict:
            # Initialize the User object with the hashed password
            return User(user_dict['email'], user_dict['password'], password_hashed=True)
        else:
            return None

    def check_password(self, password):
        return check_password_hash(self.password, password)
