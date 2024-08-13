package seed

import (
	"context"
	"log"

	// "time"

	// "go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Product struct to match MongoDB document
type Product struct {
	ID          interface{} `bson:"_id"`
	Name        string      `bson:"name"`
	Brand       string      `bson:"brand"`
	Price       float64     `bson:"price"`
	Image       string      `bson:"image"`
	Description string      `bson:"description"`
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

// 	collection := client.Database("techstore").Collection("products")

// 	Products := []{
// 	    Product{ID: primitive.NewObjectID(), Name: "Product 1", Brand: "Brand A", Price: 10.99, Image: "http://example.com/image1.jpg", Description: "Description for Product 1"},
// 	    Product{ID: primitive.NewObjectID(), Name: "Product 2", Brand: "Brand B", Price: 19.99, Image: "http://example.com/image2.jpg", Description: "Description for Product 2"},
// 	    Product{ID: primitive.NewObjectID(), Name: "Product 3", Brand: "Brand C", Price: 5.99, Image: "http://example.com/image3.jpg", Description: "Description for Product 3"},
// // Add more products as needed
		
// 	}

// 	_, err = collection.InsertMany(context.TODO(), products)
// 	if err != nil {
// 	    log.Fatal(err)
// 	}

	log.Println("Seed data inserted successfully.")
}
