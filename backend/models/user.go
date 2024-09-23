// backend/models/user.go
package models

import (
	"time"

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
