// backend/main.go
package main

import (
	"backend/handlers"
	"backend/routes"
	"context"
	"log"
	"net/http"
	"time" 
    "backend/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    // Initialize Database
    config.ConnectDB()

    // Initialize Routes
    router := routes.InitializeRoutes()
    // Set the user collection in the handlers package
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017") // Adjust as necessary
    client, err := mongo.NewClient(clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }
    handlers.UserCollection = client.Database("ecommerce").Collection("users")
    // Register handlers
    http.HandleFunc("/login", handlers.LoginHandler)
    http.HandleFunc("/signup", handlers.SignupHandler)

    // Start Server
    log.Println("Server running on port 8000")
    if err := http.ListenAndServe(":8000", router); err != nil {
        log.Fatal(err)
    }
}
