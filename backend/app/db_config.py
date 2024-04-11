from pymongo import MongoClient
import os
import json
import logging

logger = logging.getLogger(__name__)
db = None

def init_db():
    global db
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/TravelRecDB")
    client = MongoClient(mongo_uri)
    db = client["TravelRecDB"]
    destinations_coll = db["destinationsData"]
    
    if destinations_coll.count_documents({}) == 0:
        logger.info("loading data into database...")
        with open("./db_init_data/data.json", "r") as file:
            data = json.load(file)
            destinations_coll.insert_one(data)
        logger.info("data loaded successfully")
    else:
        logger.info("data already exists in database, skipping data loading")
    logger.info(f"db initialized in init_db: {db}")