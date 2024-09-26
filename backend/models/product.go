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
    Quantity       int                `json:"quantity" bson:"quantity"`
    Rating        float64            `json:"rating" bson:"rating"`
    NumReviews    int                `json:"numReviews" bson:"numReviews"`
    CountInStock  int                `json:"countInStock" bson:"countInStock"`
    ImageURL    string               `bson:"image_url" json:"image_url"`
}

func GetAllProducts() ([]Product, error) {
    // Fetch all products from MongoDB
    // ...
    var products []Product
    
    return products, nil
}

func GetProductById(id string) (Product, error) {
	// Fetch a product by ID from MongoDB
    // ...
    var product Product
    return product, nil
}