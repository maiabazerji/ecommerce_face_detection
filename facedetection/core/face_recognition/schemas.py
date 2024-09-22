from pydantic import BaseModel


class SignupRequest(BaseModel):
    user_id: str
    image_path: str


class SignupResponse(BaseModel):
    status: bool
    message: str


class LoginRequest(BaseModel):
    user_id: str
    image_path: str


class LoginResponse(BaseModel):
    status: bool
    message: str
