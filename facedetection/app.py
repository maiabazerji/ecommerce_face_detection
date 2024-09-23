import uvicorn
from api.face_recognition.router import router as face_recognition_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Face Recognition API",
    description="API for face recognition",
    version="1",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"]
)

app.include_router(face_recognition_router) 

if __name__ == "__main__": 
    uvicorn.run(app, host="0.0.0.0", port=8000)
