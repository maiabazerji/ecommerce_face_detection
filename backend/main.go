package main

import (
	"log"
	"backend/database"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize MongoDB connection
	err := database.InitMongoDB("mongodb://localhost:27017")
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Set up the router
	router := gin.Default()

	// Enable CORS middleware
	router.Use(cors.Default())

	// Routes
	routes.UserRoutes(router)
	routes.ProductRoutes(router)
	for _, route := range router.Routes() {
		log.Printf("Method: %s, Path: %s\n", route.Method, route.Path)
	}

	// Start the server on port 8080
	router.Run(":8080")
}
