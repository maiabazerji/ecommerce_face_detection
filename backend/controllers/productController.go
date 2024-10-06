package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Global variable for database connection
var db *gorm.DB

// InitializeDB sets the global db variable (you would typically do this in main.go)
func InitializeDB(database *gorm.DB) {
	db = database
}

// CreateProduct handles the creation of a new product
func CreateProduct(c *gin.Context) {
	var product models.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save product to the database
	if err := db.Create(&product).Error; err != nil { // Use GORM's Create method
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Product created successfully", "product": product})
}

// GetProducts retrieves all products from the database
func GetProducts(c *gin.Context) {
	var products []models.Product

	// Fetch products from the database
	if err := db.Find(&products).Error; err != nil { // Use GORM's Find method
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, products)
}

// GetProductByID retrieves a single product by its ID
func GetProductByID(c *gin.Context) {
	id := c.Param("id") // Get the ID from the URL parameters
	var product models.Product

	// Fetch the product from the database
	if err := db.First(&product, id).Error; err != nil { // Use GORM's First method
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, product)
}
