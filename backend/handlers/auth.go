package handlers

import (
    "backend/models"
    "context"
    "encoding/json"
    "net/http"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "golang.org/x/crypto/bcrypt"
)

// Reference to the user collection (to be set externally)
var UserCollection *mongo.Collection

// LoginHandler handles user login requests
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    var foundUser models.User
    // Find user by email in the database
    err := UserCollection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&foundUser)
    if err != nil || bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password)) != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Login successful
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

// SignupHandler handles user registration requests
func SignupHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Failed to hash password", http.StatusInternalServerError)
        return
    }
    user.Password = string(hashedPassword)

    // Insert new user into the database
    _, err = UserCollection.InsertOne(context.TODO(), user)
    if err != nil {
        http.Error(w, "Failed to create user", http.StatusInternalServerError)
        return
    }

    // Signup successful
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]bool{"success": true})
}
