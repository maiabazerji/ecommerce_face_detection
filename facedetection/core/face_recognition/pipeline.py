import logging
import os
from typing import Dict, Any, List, Tuple

import numpy as np
from deepface import DeepFace

from core.database.mongodb import init_mongo

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU usage
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


class FaceRecognition:
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.collection = init_mongo()
        self.similarity_threshold = 0.6

    def get_face_embedding(self, image_path) -> np.array:
        embedding: List[float] = DeepFace.represent(
            img_path=image_path,
            model_name=self.model_name
        )
        # embedding: List[float] = result
        # embedding = np.array(embedding)
        return embedding

    def store_user_embedding(self, user_id, embedding) -> Tuple[bool, str]:
        # Store or update user ID and embedding in MongoDB
        try:
            self.collection.update_one(
                {
                    "user_id": user_id
                },
                {
                    "$set": {
                        "embedding": embedding
                    }
                },
                upsert=True
            )
            logger.info(f"User {user_id} signed up successfully.")
            return True
        except Exception as e:
            logger.error(f"Error storing user embedding: {e}")
            return False

    def signup(self, user_id: str, image_path: str) -> Dict[bool, str]:
        embedding: List[float] = self.get_face_embedding(image_path)
        is_indexed = self.store_user_embedding(user_id, embedding)
        if not is_indexed:
            return {
                "status": False,
                "message": "Error signing up user"
            }
        return {
            "status": True,
            "message": f"User {user_id} signed up successfully."
        }

    def retrieve_user_embedding(self, user_id) -> List[float]:
        user_mongo_obj = self.collection.find_one(
            {
                "user_id": user_id
            },
            {
                "_id": 0,
                "embedding": 1
            }
        )
        if user_mongo_obj:
            return user_mongo_obj["embedding"]
        else:
            return []

    @staticmethod
    def embedding_similarity(embedding1, embedding2) -> float:
        embedding1 = np.array(embedding1)
        embedding2 = np.array(embedding2) 
        similarity_score = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
        return similarity_score

    def login(self, user_id: str, image_path: str) -> Dict[bool, str]:
        input_embedding: List[float] = self.get_face_embedding(image_path)
        stored_embedding: List[float] = self.retrieve_user_embedding(user_id)

        if len(stored_embedding) == 0:
            return {
                "status": False,
                "message": "User not found"
            }

        similarity_score = self.embedding_similarity(input_embedding, stored_embedding)

        if similarity_score >= self.similarity_threshold:
            return {
                "status": True,
                "message": "Login successful"
            }
        else:
            return {
                "status": False,
                "message": "Login failed"
            }
