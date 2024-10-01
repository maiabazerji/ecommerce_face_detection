package handlers

import (
    "backend/models"
    "context"
    "encoding/json"
    "log"
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
        http.Error(w, "Bad request: "+err.Error(), http.StatusBadRequest)
        return
    }

    var foundUser models.User
    err := UserCollection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&foundUser)
    if err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Uncomment to validate the password
    if err := bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password)); err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
}

// SignupHandler handles user registration requests
func SignupHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Bad request: "+err.Error(), http.StatusBadRequest)
        return
    }

    // Check if email already exists
    var existingUser models.User
    err := UserCollection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&existingUser)
    if err == nil { // User exists
        http.Error(w, "Email already exists", http.StatusConflict)
        return
    }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Failed to hash password: "+err.Error(), http.StatusInternalServerError)
        return
    }
    user.Password = string(hashedPassword)

    // Log the user being inserted
    log.Printf("Inserting user: %+v", user)

    // Insert new user into the database
    _, err = UserCollection.InsertOne(context.TODO(), user)
    if err != nil {
        http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]bool{"success": true})
}
