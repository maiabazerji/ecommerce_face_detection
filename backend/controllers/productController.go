package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/models"
)

func CreateProduct(c *gin.Context) {
	var product models.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save product to the database (implement database logic)

	c.JSON(http.StatusCreated, gin.H{"message": "Product created successfully"})
}

func GetProducts(c *gin.Context) {
	// Fetch products from the database (implement database logic)
	var products []models.Product
	c.JSON(http.StatusOK, products)
}
