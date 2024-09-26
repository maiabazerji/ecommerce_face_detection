// backend/models/user.go
package models

import (
	"backend/utils"
	"context" 
	"time"

    "backend/database" 

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID           primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
    Username     string             `bson:"username" json:"username"`
    Email        string             `bson:"email" json:"email"`
    Password     string             `bson:"password" json:"-"`
    PhotoURL     string             `bson:"photo_url" json:"photo_url,omitempty"`
    FaceEncoding string             `bson:"face_encoding" json:"face_encoding,omitempty"`
    CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
}

func (u *User) Save() error {
	collection := database.GetCollection("usersCredentials")
	_, err := collection.InsertOne(context.Background(), u)
	return err
}
type Credentials struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

func (u *User) Validate(credentials Credentials) *User {
	// Check if user exists in MongoDB and validate password
    collection := database.GetCollection("usersCredentials")
    filter := bson.M{"email": credentials.Email}
    err := collection.FindOne(context.Background(), filter).Decode(u)
    if err != nil {
        return nil // User not found
    }
    if !utils.CheckPasswordHash(credentials.Password, u.Password) {
        return nil // Invalid password
    }   
	return u // Return valid user object
}
