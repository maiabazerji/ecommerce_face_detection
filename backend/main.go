package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	err := database.Connect("postgres", "postgres", "ecommerce", "localhost", "5433")
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	// Get the database instance
	db := database.GetDB()
	if db == nil {
		log.Fatalf("Database is not connected")
	}

	// Run migrations

	if err := db.AutoMigrate(&models.User{}, &models.Contact{}); err != nil {
		log.Fatalf("Auto migration failed: %v", err)
	}
	if err := db.AutoMigrate(&models.User{}, &models.Product{}); err != nil {
		log.Fatalf("Auto migration failed: %v", err)
	}

	// Initialize the Gin router
	router := gin.Default()

	// Enable CORS for cross-origin requests
	router.Use(cors.Default())

	// Register routes
	routes.UserRoutes(router)       
	routes.ContactRoutes(router)    
	routes.ProductRoutes(router)
	routes.PDFRoutes(router)        

	// Start the server
	port := "8080"
	log.Printf("Starting server on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
