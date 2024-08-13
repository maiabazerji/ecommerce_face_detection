package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
    ID            primitive.ObjectID `json:"id" bson:"_id"`
    Name          string             `json:"name" bson:"name"`
    Brand         string             `json:"brand" bson:"brand"`
    Price         float64            `json:"price" bson:"price"`
    Category      string             `json:"category" bson:"category"`
    Rating        float64            `json:"rating" bson:"rating"`
    NumReviews    int                `json:"numReviews" bson:"numReviews"`
    CountInStock  int                `json:"countInStock" bson:"countInStock"`
    ImageURL    string             `bson:"image_url" json:"image_url"`
}
