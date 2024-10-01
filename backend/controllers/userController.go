package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"fmt"

	"math/rand"
	"mime/multipart"
	"net/http"
	"path"
	"time"

	"github.com/gin-gonic/gin"
)


type SignupInput struct {
	Email        string                `form:"email" binding:"required,email"`
	Password     string                `form:"password" binding:"required"`
	Photo        *multipart.FileHeader  `form:"photo"`
	FaceEncoding string                `bson:"face_encoding" json:"face_encoding,omitempty"`
}

// Signup handles user registration
func Signup(c *gin.Context) {
	var input SignupInput
	if err := c.ShouldBind(&input); err != nil { // Bind form data, not JSON
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}

	// Create new user
	user := models.User{
		Email:    input.Email,
		Password: hashedPassword,
		CreatedAt: time.Now(),
	}

	// Handle photo upload (if provided)
	if input.Photo != nil {
		// Save the uploaded photo and get the file path
		filePath, err := saveFile(c, input.Photo)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save photo"})
			return
		}
		user.PhotoURL = filePath
	}

	// Save user to the database
	db := database.GetDB() // Ensure you have a function to get the GORM DB instance
	if err := user.Save(db); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signup successful!"})
}

// saveFile saves the uploaded file in the uploads folder and returns the file name
func saveFile(c *gin.Context, file *multipart.FileHeader) (string, error) {
	// Get file extension
	extension := path.Ext(file.Filename)

	// Generate random file name
	fileName := randToken(12) + extension

	// Save uploaded file to the server
	if err := c.SaveUploadedFile(file, "uploads/"+fileName); err != nil {
		return "", err
	}

	return fileName, nil
}

// randToken generates a random string of the given length
func randToken(length int) string {
	rand.Seed(time.Now().UnixNano())
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

// Login handles user login
func Login(c *gin.Context) {
	var credentials models.Credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Fetch user by email
	user := models.User{}
	db := database.GetDB() // Ensure you have a function to get the GORM DB instance
	if err := db.Where("email = ?", credentials.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Validate the password
	if validUser := user.Validate(credentials); validUser != nil {
		token, err := utils.GenerateJWT(fmt.Sprintf("%d", user.ID), "E95FYBX9hJLMgu5b2KMjSo8hnKki/47sgCHdbqtfpJY=") // Convert uint to string
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"token": token})
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
}
