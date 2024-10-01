package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

// ProductRoutes sets up the routes for product-related operations
func ProductRoutes(router *gin.Engine) {
    productGroup := router.Group("/") // Optional: Group product-related routes

    productGroup.POST("/products", controllers.CreateProduct)
    productGroup.GET("/products", controllers.GetProducts)
}
