package seed

import (
	"context"
	"log"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Product struct to match MongoDB document
type Product struct {
    ID            primitive.ObjectID `json:"id" bson:"_id"`
    Name          string             `json:"name" bson:"name"`
    Brand         string             `json:"brand" bson:"brand"`
    Price         float64            `json:"price" bson:"price"`
    Category      string             `json:"category" bson:"category"`
    Rating        float64            `json:"rating" bson:"rating"`
    NumReviews    int                `json:"numReviews" bson:"numReviews"`
    CountInStock  int                `json:"countInStock" bson:"countInStock"`
    ImageURL    string               `bson:"image_url" json:"image_url"`
}

func SeedProducts() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Seed data inserted successfully.")
}
