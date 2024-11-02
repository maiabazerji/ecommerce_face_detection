package controllers

import (
	"backend/database"
	"backend/models"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var jwtSecret = []byte("your_secret_key")

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

	hashedPassword, err := HashPassword(input.Password)
	if err != nil {
		log.Printf("Signup error: password hashing failed: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	user := models.User{
		Email:     input.Email,
		Password:  hashedPassword,
		Username:  input.Username,
		CreatedAt: time.Now(),
	}

	db := database.GetDB()
	if db == nil {
		log.Printf("Signup error: could not connect to database")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not connect to database"})
		return
	}

	// Migrate the User model if necessary
	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Printf("Signup error: migration failed: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not migrate database"})
		return
	}

	if err := db.Create(&user).Error; err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok && pgErr.Code == "23505" {
			log.Printf("Signup failed: user with email %s already exists", user.Email)
			c.JSON(http.StatusConflict, gin.H{"error": "User with email already exists"})
			return
		}
		log.Printf("Signup error: database error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

// Login handles user login
func Login(c *gin.Context) {
	var credentials models.Credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		log.Printf("Login error: invalid input: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := database.GetDB()
	if db == nil {
		log.Printf("Login error: could not connect to database")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not connect to database"})
		return
	}

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

	if err := CheckPasswordHash(credentials.Password, user.Password); err != nil {
		log.Printf("Login failed: invalid password for user %s", credentials.Email)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := GenerateJWT(user)
	if err != nil {
		log.Printf("Login error: could not generate token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not log in"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful!", "token": token})
}

// HashPassword hashes the password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// CheckPasswordHash compares a hashed password with a plain password
func CheckPasswordHash(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// GenerateJWT generates a JWT token for the user
func GenerateJWT(user models.User) (string, error) {
	claims := jwt.MapClaims{
		"email":    user.Email,
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(), // Token expiration time
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
