package controllers

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var products = []models.Product{
	{
		ID:       1,
		Name:     "Custom Website Templates",
		Price:    99.99,
		Category: "Digital Products",
		ImageURL: "/images/websitetemp.png",
	},
	{
		ID:       2,
		Name:     "Web Development Courses",
		Price:    100.00,
		Category: "Online Courses",
		ImageURL: "/images/webdevcourse.png",
	},
	{
		ID:       3,
		Name:     "AI-Powered Chatbots",
		Price:    149.99,
		Category: "Chatbot Solutions",
		ImageURL: "/images/chatbot.png",
	},
	{
		ID:       4,
		Name:     "Cybersecurity Awareness E-books",
		Price:    29.99,
		Category: "E-books",
		ImageURL: "/images/cybersecurityebook.png",
	},
	{
		ID:       5,
		Name:     "WordPress Security Plugin",
		Price:    49.99,
		Category: "WordPress Plugins",
		ImageURL: "/images/wp-security-plugin.png",
	},
	{
		ID:       6,
		Name:     "Personal Branding Kits",
		Price:    79.99,
		Category: "Branding Solutions",
		ImageURL: "/images/brandingkit.jpg",
	},
	{
		ID:       7,
		Name:     "Project Management Tool",
		Price:    15.99,
		Category: "Productivity Tools",
		ImageURL: "/images/project-management-tool.jpg",
	},
	{
		ID:       8,
		Name:     "Website Security Audit",
		Price:    99.99,
		Category: "Security Services",
		ImageURL: "/images/security-audit.jpg",
	},
	{
		ID:       9,
		Name:     "AI-Powered Analytics Dashboard",
		Price:    199.99,
		Category: "Analytics Tools",
		ImageURL: "/images/analytics-dashboard.jpg",
	},
	{
		ID:       10,
		Name:     "Personal Finance Management Systems",
		Price:    200.00,
		Category: "Mobile Apps",
		ImageURL: "/images/finance-app.jpg",
	},
}

// GetProducts retrieves all products
func GetProducts(c *gin.Context) {
	c.JSON(http.StatusOK, products)
}

// GetProductByID retrieves a product by its ID
func GetProductByID(c *gin.Context) {
	id := c.Param("id")
	for _, product := range products {
		if strconv.Itoa(product.ID) == id {
			c.JSON(http.StatusOK, product)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "product not found"})
}

// CreateProduct handles the creation of a new product
func CreateProduct(c *gin.Context) {
	var newProduct models.Product
	if err := c.ShouldBindJSON(&newProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	products = append(products, newProduct)
	c.JSON(http.StatusCreated, newProduct)
}
