package routes

import (
	"backend/controllers"
	"backend/models"

	"github.com/gin-contrib/cors" // Import the CORS package
	"github.com/gin-gonic/gin"
)

// ProductRoutes sets up the routes for product-related operations
func ProductRoutes(router *gin.Engine) {
	router.Use(cors.Default()) // Enable CORS for all routes

	// Route for creating a product
	router.POST("/products", controllers.CreateProduct)

	// Route for getting a list of products
	router.GET("/products", func(c *gin.Context) {
		// Sample data for demonstration; replace this with actual database logic later
		products := []models.Product{
			// 1. Custom Website Templates
			{
				ID:       1,
				Name:     "Custom Website Templates",
				Price:    99.99,
				Category: "Digital Products",
				ImageURL: "https://example.com/images/custom-website-template.jpg",
			},
			// 2. Web Development Courses
			{
				ID:       2,
				Name:     "Web Development Courses",
				Price:    199.99,
				Category: "Online Courses",
				ImageURL: "https://example.com/images/web-development-course.jpg",
			},
			// 3. AI-Powered Chatbots
			{
				ID:       3,
				Name:     "AI-Powered Chatbots",
				Price:    149.99,
				Category: "Chatbot Solutions",
				ImageURL: "https://example.com/images/ai-chatbot.jpg",
			},
			// 4. Cybersecurity Awareness E-books
			{
				ID:       4,
				Name:     "Cybersecurity Awareness E-books",
				Price:    29.99,
				Category: "E-books",
				ImageURL: "https://example.com/images/cybersecurity-ebook.jpg",
			},
			// 5. WordPress Plugins
			{
				ID:       5,
				Name:     "WordPress Security Plugin",
				Price:    49.99,
				Category: "WordPress Plugins",
				ImageURL: "https://example.com/images/wp-security-plugin.jpg",
			},
			// 6. Personal Branding Kits
			{
				ID:       6,
				Name:     "Personal Branding Kits",
				Price:    79.99,
				Category: "Branding Solutions",
				ImageURL: "https://example.com/images/branding-kit.jpg",
			},
			// 7. Subscription-Based Tools
			{
				ID:       7,
				Name:     "Project Management Tool",
				Price:    15.99,
				Category: "Productivity Tools",
				ImageURL: "https://example.com/images/project-management-tool.jpg",
			},
			// 8. Website Security Audits
			{
				ID:       8,
				Name:     "Website Security Audit",
				Price:    99.99,
				Category: "Security Services",
				ImageURL: "https://example.com/images/security-audit.jpg",
			},
			// 9. AI-Powered Analytics Dashboards
			{
				ID:       9,
				Name:     "AI-Powered Analytics Dashboard",
				Price:    199.99,
				Category: "Analytics Tools",
				ImageURL: "https://example.com/images/analytics-dashboard.jpg",
			},
			// 10. Freemium Mobile Apps
			{
				ID:       10,
				Name:     "Personal Finance Management Systems",
				Price:    200.00,
				Category: "Mobile Apps",
				ImageURL: "https://example.com/images/finance-app.jpg",
			},
		}

		// Respond with the products in JSON format
		c.JSON(200, products)
	})
}
