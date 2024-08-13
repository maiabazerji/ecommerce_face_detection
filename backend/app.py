from flask import Flask, request, jsonify
import face_recognition
import cv2
import numpy as np

app = Flask(__name__)

# In-memory database for simplicity
users = {}

@app.route('/register', methods=['POST'])
def register():
    # Receive image from the request
    image_file = request.files.get('image')
    image = face_recognition.load_image_file(image_file)

    # Encode the face in the image
    face_encodings = face_recognition.face_encodings(image)
    if len(face_encodings) == 0:
        return jsonify({"error": "No face detected"}), 400

    face_encoding = face_encodings[0]
    
    # Store the face encoding along with user info
    username = request.form.get('username')
    users[username] = face_encoding.tolist()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    # Receive image from the request
    image_file = request.files.get('image')
    image = face_recognition.load_image_file(image_file)
    
    # Encode the face in the image
    face_encodings = face_recognition.face_encodings(image)
    if len(face_encodings) == 0:
        return jsonify({"error": "No face detected"}), 400

    face_encoding = face_encodings[0]
    
    # Compare with stored users' face encodings
    for username, user_encoding in users.items():
        match = face_recognition.compare_faces([np.array(user_encoding)], face_encoding)[0]
        if match:
            return jsonify({"message": "Login successful", "username": username}), 200
    
    return jsonify({"error": "No matching face found"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
