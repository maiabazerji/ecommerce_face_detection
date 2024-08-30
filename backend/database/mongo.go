package database

import (
    "context"
    "log"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var ProductCollection *mongo.Collection

func ConnectDB() {
    clientOptions := options.Client().ApplyURI("MONGODB_URI")
    // clientOptions := options.Client().ApplyURI("mongodb://localhost:27017").SetTLSConfig(&tls.Config{InsecureSkipVerify: true}) 
    // clientOptions := options.Client().ApplyURI("mongodb://localhost:27017").SetTLSConfig(&tls.Config{})
    // clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
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
