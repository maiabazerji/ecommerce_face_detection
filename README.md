# E-commerce Face Detection

## Overview
This project is an e-commerce platform that implements face recognition for user login and signup. It features a React frontend, a Golang backend, and utilizes MongoDB for data storage. The face recognition capabilities are powered by the DeepFace library in Python.

## Features
- User authentication via face recognition
- Product catalog with cart functionality
- User profile management
- Secure data handling using MongoDB

## Technologies
- **Frontend:** React.js
- **Backend:** Golang
- **Database:** MongoDB
- **Face Recognition:** Python with DeepFace
- **Deployment:** Local

## Quick Start
To get a local copy up and running, follow these steps:

### Installation
1. **Install Required Software:**
   - Go (version 1.16 or higher)
   - MongoDB (local installation)
   - Python (version 3.7 or higher)

2. **Install Required Python Libraries:**
   ```bash
   pip install deepface flask pymongo
   ```

3. **Clone the Repository:**
   ```bash
   git clone https://github.com/maiabazerji/ecommerce_face_detection.git
   cd ecommerce_face_detection
   ```

### Running the Application
1. **Start MongoDB:**
   Make sure your MongoDB service is running locally.

2. **Run the Backend (Golang):**
   ```bash
   cd backend
   go run main.go
   ```

3. **Run the Frontend (React):**
   ```bash
   cd frontend
   npm install  # Install frontend dependencies
   npm start    # Start the React app
   ```

4. **Run the Face Detection Service (Python):**
   ```bash
   cd facedetection
   python app.py
   ```

## Usage
- Navigate to `http://localhost:3000` in your web browser to access the e-commerce platform.
- Use your face for authentication during login/signup.


## License
This project is licensed under the MIT License.

## Acknowledgments
- [DeepFace](https://github.com/serengil/deepface) for face recognition capabilities.
- [MongoDB](https://www.mongodb.com/) for the database solution.
- [React.js](https://reactjs.org/) for the frontend framework.
- [Golang](https://golang.org/) for the backend development.
```
