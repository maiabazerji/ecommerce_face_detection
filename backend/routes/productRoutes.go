package routes

import (
	"github.com/gin-gonic/gin"
	"backend/controllers"
	
)

func ProductRoutes(router *gin.Engine) {
	productRoutes := router.Group("/products")
	{
		productRoutes.GET("/", controllers.GetProducts)
		productRoutes.GET("/:id", controllers.GetProduct)
	}
}
