package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"backend/models"
)

func GetProducts(c *gin.Context) {
	products, err := models.GetAllProducts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch products"})
		return
	}
	c.JSON(http.StatusOK, products)
}

func GetProduct(c *gin.Context) {
	id := c.Param("id")
	product, err := models.GetProductById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}
