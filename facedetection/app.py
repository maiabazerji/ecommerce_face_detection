import numpy as np
import cv2
# from tensorflow.keras.models import load_model
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import os

app = FastAPI()

# Load the pre-trained face recognition model

model = load_model('face_recognition_model.h5')

# Load the label encoder
label_encoder = None
with open('label_encoder.npy', 'rb') as f:
    label_encoder = np.load(f, allow_pickle=True).item()

def recognize_face(image: np.array):
    img_resized = cv2.resize(image, (64, 64))
    img_normalized = img_resized.astype('float32') / 255.0
    img_expanded = np.expand_dims(img_normalized, axis=0)

    prediction = model.predict(img_expanded)
    predicted_class = np.argmax(prediction, axis=1)
    predicted_label = label_encoder.inverse_transform(predicted_class)
    
    return predicted_label[0]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_data = await file.read()
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    result = recognize_face(image)
    
    return {"recognized_person": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
