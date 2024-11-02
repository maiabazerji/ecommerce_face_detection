package routes

import (
	"backend/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func ProductRoutes(router *gin.Engine) {
	router.Use(cors.Default())

	// Serve static files from the 'frontend/public/images' directory
	router.Static("/images", "./frontend/public/images")

	// Define product routes
	router.POST("/products", controllers.CreateProduct) // Create a new product
	router.GET("/products", controllers.GetProducts)    // Get all products
	router.GET("/products/:id", controllers.GetProductByID) // Get a product by ID
}
