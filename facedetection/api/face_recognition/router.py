from fastapi import APIRouter

from core.face_recognition.pipeline import FaceRecognition
from core.face_recognition.schemas import SignupRequest, SignupResponse, LoginRequest, LoginResponse

router = APIRouter(prefix="/face_rec", tags=["face_recognition"])

model_name = "VGG-Face"
pipeline = FaceRecognition(model_name)


@router.post("/signup", response_model=SignupResponse)
async def signup(request: SignupRequest) -> SignupResponse:
    message = pipeline.signup(request.user_id, request.image_path)
    return SignupResponse(**message)


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest) -> LoginResponse:
    message = pipeline.login(request.user_id, request.image_path)
    return LoginResponse(**message)
