package controllers

import (
	"backend/database"
	"backend/models"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"gorm.io/gorm"
)

// SignupInput represents the expected input for the Signup function
type SignupInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
	Username string `json:"username" binding:"required"`
}

// Signup handles user registration
func Signup(c *gin.Context) {
	var input SignupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Signup error: invalid input: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Create a new user with provided fields
	user := models.User{
		Email:       input.Email,
		Password:    input.Password,
		Username:    input.Username,
		CreatedAt:   time.Now(),
	}
	// Get the database instance
	db := database.GetDB()
	if db == nil {
		log.Printf("Signup error: could not connect to database")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not connect to database"})
		return
	}
    db.AutoMigrate(&models.User{})

// log.Printf("Attempting to save user with email: %s", user.Email)
    // Insert user into the database
    if err := db.Create(&user).Error; err != nil {
        if pgErr, ok := err.(*pgconn.PgError); ok {
            if pgErr.Code == "23505" {
                log.Printf("Signup failed: user with email %s already exists", user.Email)
                c.JSON(http.StatusConflict, gin.H{"error": "User with email already exists"})
                return
            }
        }
        log.Printf("Signup error: database error: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
        return
    }   
    c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
    }
// Login handles user login
func Login(c *gin.Context) {
	var credentials models.Credentials // Struct for login credentials (email, password)
	if err := c.ShouldBindJSON(&credentials); err != nil {
		log.Printf("Login error: invalid input: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the database instance
	db := database.GetDB()
	if db == nil {
		log.Printf("Login error: could not connect to database")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not connect to database"})
		return
	}

	// Fetch user by email
	log.Printf("Attempting to find user with email: %s", credentials.Email)
	var user models.User
	if err := db.Where("LOWER(email) = LOWER(?)", credentials.Email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Login failed: user with email %s not found", credentials.Email)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}
		log.Printf("Login error: database query error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query error"})
		return
	}



	// JWT token generation would go here
	c.JSON(http.StatusOK, gin.H{"message": "Login successful!"})
}
