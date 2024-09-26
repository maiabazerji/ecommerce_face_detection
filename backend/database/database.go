package database

import (
	"context"
	"log"


	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

// InitMongoDB initializes the MongoDB connection
func InitMongoDB(uri string) error {
	// Set MongoDB client options
	clientOptions := options.Client().ApplyURI(uri)

	// Connect to MongoDB
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return err
	}
	
	// Ping the MongoDB server to verify the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		return err
	}

	log.Println("Connected to MongoDB!")
	return nil
}

// Connect initializes a MongoDB connection (Deprecated, use InitMongoDB instead)
func Connect() {
	// Set MongoDB URI (You can update this to your connection string)
	uri := "mongodb://localhost:27017"

	// Use the InitMongoDB function to establish the connection
	err := InitMongoDB(uri)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v",  uri)
	}
}


// GetCollection retrieves a MongoDB collection from the initialized client
func GetCollection(collectionName string) *mongo.Collection {
	if client == nil {
		log.Fatal("MongoDB client is not connected")
	}
	return client.Database("ecommerce").Collection(collectionName)
}
