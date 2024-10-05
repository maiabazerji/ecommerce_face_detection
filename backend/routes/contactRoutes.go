package routes

import (
	// "net/http"
	"backend/controllers"

	"github.com/gin-gonic/gin")

func ContactRoutes(router *gin.Engine) {
	// Register the contact route
	router.POST("/contact", controllers.SubmitContact)
}
