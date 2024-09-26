package controllers

import (
	"backend/models"
	"backend/utils"
	"log"

	// "math/rand"
	// "mime/multipart"
	"net/http"
	// "path"
	// "time"

	"github.com/gin-gonic/gin"
)

type SignupInput struct {
	Email    string                `form:"email" binding:"required,email"`
	Password string                `form:"password" binding:"required"`
	// Photo    *multipart.FileHeader `form:"photo"` 
}


func Signup(c *gin.Context) {
	log.Println(c)
	log.Println("FADYYY L 8ALIZZZ EROOO SEXYY KTIRRRRRRRRRRRR")
	var input SignupInput
	if err := c.ShouldBind(&input); err != nil {  // Bind form data, not JSON
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash password
	hashedPassword, _ := utils.HashPassword(input.Password) 

	// Create new user
	user := models.User{
		Email:    input.Email,
		Password: hashedPassword,
	}

	// Optionally handle photo upload (if provided)
	// if input.Photo != nil {
	// 	// Handle file upload (photo), save it to a directory, and store the file path in the user
	// 	// Example:
	// 	path, err := saveFile(c, input.Photo)  // Implement saveFile function to store the file
	// 	if err != nil {
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save photo"})
	// 		return
	// 	}
	// 	user.PhotoURL = path
	// }

	// Save user to MongoDB
	if err := user.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signup successful!"})
}


//save photo in folder upload
// func saveFile(c *gin.Context, file *multipart.FileHeader) (string, error) {
// 	// Get file extension
// 	extension := path.Ext(file.Filename)

// 	// Generate random file name
// 	fileName := randToken(12) + extension

// 	// Save uploaded file to the server
// 	if err := c.SaveUploadedFile(file, "uploads/"+fileName); err != nil {
// 		return "", err
// 	}

// 	return fileName, nil
// }

// func randToken(length int) string {
// 	rand.Seed(time.Now().UnixNano())
// 	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// 	b := make([]byte, length)
// 	for i := range b {
// 		b[i] = charset[rand.Intn(len(charset))]
// 	}
// 	return string(b)
// }

func Login(c *gin.Context) {
	var credentials models.Credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Login logic here

	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})

	// Fetch user by email and verify credentials
	user := models.User{}
	if validUser := user.Validate(credentials); validUser != nil {
		token, _ := utils.GenerateJWT(validUser.ID.Hex())
		c.JSON(http.StatusOK, gin.H{"token": token})
		return
	}
	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
}
