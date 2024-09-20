from deepface import DeepFace
import pymongo
import numpy as np
import os
import json

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU usage
import tensorflow as tf


import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))


# MongoDB Initialization
try:
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["ecommerce"]
    collection = db["users"]
    print("Connected to MongoDB")
except pymongo.errors.ConnectionError as e:
    print(f"Error connecting to MongoDB: {e}")

def get_face_embedding(image_path):
    result = DeepFace.represent(img_path=image_path, model_name='VGG-Face')
    embedding = result[0]['embedding']
    print(f"Embedding type: {type(embedding)}")  # Check the type of embedding
    return embedding

def store_user_embedding(user_id, embedding):
    # If embedding is a NumPy array, convert it to list; if it's already a list, use it directly
    embedding_list = embedding if isinstance(embedding, list) else embedding.tolist()
    # Store or update user ID and embedding in MongoDB
    collection.update_one(
        {"user_id": user_id},
        {"$set": {"embedding": embedding_list}},
        upsert=True
    )

def retrieve_user_embedding(user_id):
    user = collection.find_one({"user_id": user_id})
    if user:
        return np.array(user["embedding"])
    return None

def compare_embeddings(embedding1, embedding2, threshold=0.6):
    similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
    return similarity >= threshold

def signup(user_id, image_path):
    embedding = get_face_embedding(image_path)
    if embedding is not None:
        store_user_embedding(user_id, embedding)
        print(f"User {user_id} signed up successfully.")

def login(user_id, image_path):
    embedding = get_face_embedding(image_path)
    if embedding is None:
        print("Error generating embedding for login.")
        return
    
    stored_embedding = retrieve_user_embedding(user_id)
    
    if stored_embedding is not None:
        is_match = compare_embeddings(embedding, stored_embedding)
        if is_match:
            print("Login successful")
        else:
            print("Login failed")
    else:
        print("User not found")

# Example usage
# signup_user_id = 'user123'
# signup_image_path = 'photo.jpg'
# signup(signup_user_id, signup_image_path)

# login_user_id = 'user123'
# login_image_path = 'photo.jpg'
# login(login_user_id, login_image_path)
