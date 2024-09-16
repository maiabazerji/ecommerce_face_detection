import torch
from facenet_pytorch import InceptionResnetV1
import numpy as np
from pymongo import MongoClient
from PIL import Image
import io
from sklearn.metrics.pairwise import cosine_similarity
from torchvision import transforms

# MongoDB Setup
client = MongoClient('mongodb://localhost:27017/')
db = client['ecommerce']  # Replace with your database name
users_collection = db['users']  # Users collection

# Function to convert image to tensor for model input
def to_input(pil_rgb_image):
    transform = transforms.Compose([
        transforms.Resize((160, 160)),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])
    return transform(pil_rgb_image).unsqueeze(0)  # Add batch dimension

# Load the FaceNet model
def load_pretrained_model():
    model = InceptionResnetV1(pretrained='vggface2').eval()  # Pretrained on VGGFace2
    return model

model = load_pretrained_model()

# Convert binary image from MongoDB to PIL Image
def binary_to_image(binary_img):
    img = Image.open(io.BytesIO(binary_img))
    return img

# Get face embeddings
def get_face_embedding(image):
    tensor_input = to_input(image)
    with torch.no_grad():
        embedding = model(tensor_input)
    return embedding.cpu().numpy()

# Signup (register new face)
def signup(user_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        print(f"User {user_id} not found in database!")
        return False

    # Assuming image is stored as binary in MongoDB (adjust if needed)
    if 'image' in user:
        image = binary_to_image(user['image'])
    else:
        print(f"No image found for user {user_id}.")
        return False

    embedding = get_face_embedding(image)
    
    # Store embedding back to MongoDB
    users_collection.update_one({"_id": user_id}, {"$set": {"face_embedding": embedding.tolist()}})
    
    print(f"User {user_id} registered successfully.")
    return True

# Login (authenticate face)
def login(user_id, image_path, threshold=0.6):
    user = users_collection.find_one({"_id": user_id})
    if not user or 'face_embedding' not in user:
        print(f"User {user_id} not found or not registered with a face!")
        return False

    stored_embedding = np.array(user['face_embedding'])
    
    # Load the input image for comparison
    input_image = Image.open(image_path)  # Replace with an image file path
    input_embedding = get_face_embedding(input_image)

    # Compute cosine similarity between stored embedding and input embedding
    similarity = cosine_similarity(input_embedding, stored_embedding)
    print(f"Similarity score: {similarity}")

    if similarity >= threshold:
        print("Login successful!")
        return True
    else:
        print("Login failed. Face does not match.")
        return False

# Example usage
if __name__ == '__main__':
    # User signup (fetch image from MongoDB)
    signup('user1')  # Replace 'user1' with a valid user ID from MongoDB
    
    # User login (compare with new face image)
    login('user1', 'test_images/user1.jpg')  # Provide path to the image for login
