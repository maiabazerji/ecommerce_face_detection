package routes

import (
	"backend/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	// Register the signup and login routes directly without extra grouping
	router.POST("/signup", controllers.Signup)
	router.POST("/login", controllers.Login)
}
