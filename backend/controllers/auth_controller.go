// backend/controllers/auth_controller.go
package controllers

import (
    "encoding/json"
    "net/http"

    "backend/models"
    "backend/services"
    "backend/utils"
)

type SignupRequest struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"password"`
    Photo    string `json:"photo,omitempty"` // Base64 encoded image or URL
}

type SignupResponse struct {
    Message string `json:"message"`
    Token   string `json:"token,omitempty"`
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
    var req SignupRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
        return
    }

    user := &models.User{
        Username: req.Username,
        Email:    req.Email,
        Password: req.Password,
        // PhotoURL and FaceEncoding can be set after face recognition
    }

    // Perform Signup
    err := services.Signup(user)
    if err != nil {
        utils.RespondWithError(w, http.StatusBadRequest, err.Error())
        return
    }

    // Optionally, generate JWT token
    token, err := utils.GenerateJWT(user.ID.Hex())
    if err != nil {
        utils.RespondWithError(w, http.StatusInternalServerError, "Error generating token")
        return
    }

    response := SignupResponse{
        Message: "Signup successful",
        Token:   token,
    }

    utils.RespondWithJSON(w, http.StatusCreated, response)
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Message string `json:"message"`
    Token   string `json:"token,omitempty"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    var req LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
        return
    }

    user, err := services.Login(req.Email, req.Password)
    if err != nil {
        utils.RespondWithError(w, http.StatusUnauthorized, err.Error())
        return
    }

    token, err := utils.GenerateJWT(user.ID.Hex())
    if err != nil {
        utils.RespondWithError(w, http.StatusInternalServerError, "Error generating token")
        return
    }

    response := LoginResponse{
        Message: "Login successful",
        Token:   token,
    }

    utils.RespondWithJSON(w, http.StatusOK, response)
}
