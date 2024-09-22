// In backend/database/mongodb.go (or mongo.go)
package database

import (
	"context"

    "log"


	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
    UserCollection *mongo.Collection
)

func init() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatalf("Failed to connect to MongoDB: %v", err)
    }

    UserCollection = client.Database("ecommerce").Collection("users")
}
   
