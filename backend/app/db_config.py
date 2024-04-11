from pymongo import MongoClient
import os

db = None

def init_db():
    global db
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/TravelRecDB")
    client = MongoClient(mongo_uri)
    db = client["TravelRecDB"]