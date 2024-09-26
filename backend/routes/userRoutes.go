package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	userRoutes := router.Group("/")
	{
		userRoutes.POST("/signup", controllers.Signup)
		userRoutes.POST("/login", controllers.Login)
	}
}
