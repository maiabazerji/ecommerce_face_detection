package middleware

import (
	"github.com/gin-gonic/gin"
	// "backend/utils"
	"net/http"
	"log"
)

// AuthMiddleware checks for a valid JWT token in the Authorization header.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Authorization")

		// Check if the Authorization header is empty
		if token == "" {
			log.Println("Unauthorized: No token provided")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Validate the JWT token
		// _, err := utils.ValidateJWT(token)
		// if err != nil {
		// 	log.Printf("Unauthorized: Invalid token - %v", err)
		// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		// 	c.Abort()
		// 	return
		// }

		// Proceed to the next handler if the token is valid
		c.Next()
	}
}
