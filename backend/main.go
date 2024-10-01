package main

import (
    "log"
    

    "backend/models"
    "backend/routes"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

    // Get the database connection details from environment variables
    dsn := "host=localhost user=yourusername password=yourpassword dbname=ecommercedb port=5432 sslmode=disable"
    
    // Connect to PostgreSQL
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Error connecting to PostgreSQL database: %v", err)
    }

    // Migrate the schema
    if err := db.AutoMigrate(&models.User{}); err != nil { // Automatically create/update the User table
        log.Fatalf("Error migrating database: %v", err)
    }

    // Create a new Gin router
    r := gin.Default()

    // Setup routes
    routes.ProductRoutes(r) 
    routes.UserRoutes(r)

    // Start the server
    if err := r.Run(":8080"); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
