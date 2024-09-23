// backend/services/auth_service.go
package services

import (
    "context"
    "backend/config"
    "backend/models"
    "backend/utils"
    "errors"
    "time"

    "go.mongodb.org/mongo-driver/bson"

)

func Signup(user *models.User) error {
    collection := config.DB.Collection("users")

    // Check if user already exists
    var existingUser models.User
    err := collection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&existingUser)
    if err == nil {
        return errors.New("user already exists")
    }

    // Hash password
    hashedPassword, err := utils.HashPassword(user.Password)
    if err != nil {
        return err
    }
    user.Password = hashedPassword
    user.CreatedAt = time.Now()

    // Insert user into DB
    _, err = collection.InsertOne(context.Background(), user)
    return err
}

func Login(email, password string) (*models.User, error) {
    collection := config.DB.Collection("users")

    var user models.User
    err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
    if err != nil {
        return nil, errors.New("user not found")
    }

    if !utils.CheckPasswordHash(password, user.Password) {
        return nil, errors.New("invalid password")
    }

    return &user, nil
}
