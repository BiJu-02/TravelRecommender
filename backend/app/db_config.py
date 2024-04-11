from pymongo import MongoClient
import os
import json
import logging

logger = logging.getLogger(__name__)
db = None

def init_db(data):
    global db
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/TravelRecDB")
    client = MongoClient(mongo_uri)
    db = client["TravelRecDB"]
    
    if db.destinationsData.count_documents({}) == 0:
        logger.info("loading data into database...")
        db.destinationsData.insert_one(data)
        logger.info("data loaded successfully")
    else:
        logger.info("data already exists in database, skipping data loading")
    logger.info(f"db initialized in init_db: {db}")