// backend/database/database.go
package database

import (
    "context"
    "log"
    "os"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var ProductCollection *mongo.Collection

func ConnectDB() {
    clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    err = client.Ping(context.TODO(), nil)
    if err != nil {
        log.Fatal(err)
    }

    ProductCollection = client.Database("ecommerce").Collection("products")
    log.Println("Database connection established")
}
