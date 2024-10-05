package controllers

import (
	"backend/database"
	"backend/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ContactInput represents the expected input for the Contact form
type ContactInput struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

// SubmitContact handles contact form submissions
func SubmitContact(c *gin.Context) {
	var input ContactInput
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Contact form submission error: invalid input: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new contact message
	contact := models.Contact{
		Name:      input.Name,
		Email:     input.Email,
		Message:   input.Message,
	}

	// Get the database instance
	db := database.GetDB()
	if db == nil {
		log.Printf("Contact form submission error: could not connect to database")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not connect to database"})
		return
	}

	// Insert the contact message into the database
	if err := db.Create(&contact).Error; err != nil {
		log.Printf("Contact form submission error: database error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	log.Printf("Contact form submitted successfully by %s", input.Email)
	c.JSON(http.StatusCreated, gin.H{"message": "Thank you for contacting us!"})
}
