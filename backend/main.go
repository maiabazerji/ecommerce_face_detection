package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the database connection
	// Provide the correct values for the database connection
	err := database.Connect("root", "secret", "ecommercedb", "localhost", "5432")
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	// Now you can use the database connection
	db := database.GetDB()
	if db == nil {
		log.Fatalf("Database is not connected")
	}

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	if err := db.AutoMigrate(&models.Contact{}); err != nil {
		log.Fatalf("Auto migration failed: %v", err)
	}

	// Initialize Gin router
	router := gin.Default()
	// Define the routes
	routes.UserRoutes(router)
	routes.ContactRoutes(router)

	router.Run() // Start the server
	port := "8080"
	log.Printf("Server running on port %s", port)

}
