package routes

import (
	"backend/controllers"
	"log"
	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	// Register the signup route
	router.POST("/signup", controllers.Signup)
	log.Println("Registered /signup route")

	// Register the login route
	router.POST("/login", controllers.Login)
	log.Println("Registered /login route")
}
