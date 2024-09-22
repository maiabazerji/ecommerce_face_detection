import logging

import pymongo
from yaml import safe_load

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


# MongoDB Initialization
def init_mongo(config_path='./core/database/config.yaml'):
    config = safe_load(open(config_path, "r"))

    try:
        client = pymongo.MongoClient(config["mongodb"]["uri"])
        db = client[config["mongodb"]["db"]]
        collection = db[config["mongodb"]["collection"]]
        logger.info("Connected to MongoDB")
        return collection
    except pymongo.errors.ConnectionError as e:
        logger.info(f"Error connecting to MongoDB: {e}")
