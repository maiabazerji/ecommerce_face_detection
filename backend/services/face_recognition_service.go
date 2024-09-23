// backend/services/face_recognition_service.go
package services

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type FaceRecognitionResponse struct {
    Success bool   `json:"success"`
    UserID  string `json:"user_id,omitempty"`
    Message string `json:"message,omitempty"`
}

func RecognizeFace(imageData string) (*FaceRecognitionResponse, error) {
    payload := map[string]string{
        "image": imageData,
    }
    jsonData, err := json.Marshal(payload)
    if err != nil {
        return nil, err
    }

    resp, err := http.Post("http://127.0.0.1:5000/recognize", "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result FaceRecognitionResponse
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }

    return &result, nil
}
