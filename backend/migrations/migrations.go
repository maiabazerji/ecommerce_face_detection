package migrations

import (
	"log"
	"github.com/jmoiron/sqlx"
)

// MigrateDB applies the database migrations
func MigrateDB(db *sqlx.DB) {
	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username VARCHAR(50) NOT NULL UNIQUE, 
		email VARCHAR(100) NOT NULL UNIQUE,   
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`

	insertUsers := `
	INSERT INTO users (username, email, password) VALUES 
	('johnsmith', 'johnsmith@gmail.com', 'password1'),
	('janedoe', 'janedoe@gmail.com', 'password2'),
	('emilyjones', 'emilyjones@gmail.com', 'password3')
	ON CONFLICT (username) DO NOTHING;
	`

	createServicesTable := `
	CREATE TABLE IF NOT EXISTS services (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT,
		price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
		category VARCHAR(50),
		image_url VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`

	insertServices := `
	INSERT INTO services (name, description, price, category, image_url) VALUES 
	('Custom Website Templates', 'Pre-designed templates for custom websites.', 99.99, 'Digital Products', '/images/websitetemp.png'),
	('Web Development Courses', 'Online courses for web development.', 100.00, 'Online Courses', '/images/webdevcourse.png'),
	('AI-Powered Chatbots', 'Custom chatbots powered by AI technology.', 149.99, 'Chatbot Solutions', '/images/chatbot.png'),
	('Cybersecurity Awareness E-books', 'E-books on cybersecurity best practices.', 29.99, 'E-books', '/images/cybersecurityebook.png'),
	('WordPress Security Plugin', 'Security plugin for WordPress websites.', 49.99, 'WordPress Plugins', '/images/wp-security-plugin.png'),
	('Personal Branding Kits', 'Kits to help establish your personal brand.', 79.99, 'Branding Solutions', '/images/brandingkit.jpg'),
	('Project Management Tool', 'Tool for managing projects effectively.', 15.99, 'Productivity Tools', '/images/project-management-tool.jpg'),
	('Website Security Audit', 'Comprehensive audit of website security.', 99.99, 'Security Services', '/images/security-audit.jpg'),
	('AI-Powered Analytics Dashboard', 'Dashboard for analyzing data with AI.', 199.99, 'Analytics Tools', '/images/analytics-dashboard.jpg'),
	('Personal Finance Management Systems', 'Mobile apps for managing personal finances.', 200.00, 'Mobile Apps', '/images/finance-app.jpg')
	ON CONFLICT (name) DO NOTHING;
	`

	createOrdersTable := `
	CREATE TABLE IF NOT EXISTS orders (
		id SERIAL PRIMARY KEY,
		user_id INT REFERENCES users(id) ON DELETE CASCADE,
		total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
		status VARCHAR(20) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`

	insertOrders := `
	INSERT INTO orders (user_id, total_amount, status) VALUES 
	(1, 35.99, 'Completed'),
	(2, 15.49, 'Pending'),
	(1, 25.00, 'Completed'),
	(3, 10.00, 'Cancelled')
	ON CONFLICT (id) DO NOTHING;
	`

	createOrderItemsTable := `
	CREATE TABLE IF NOT EXISTS order_items (
		id SERIAL PRIMARY KEY,
		order_id INT REFERENCES orders(id) ON DELETE CASCADE,
		service_id INT REFERENCES services(id) ON DELETE CASCADE,
		quantity INT NOT NULL CHECK (quantity > 0),
		price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase >= 0)
	);
	`

	insertOrderItems := `
	INSERT INTO order_items (order_id, service_id, quantity, price_at_purchase) VALUES 
	(1, 1, 1, 99.99),
	(1, 2, 1, 100.00),
	(2, 2, 1, 100.00),
	(3, 4, 1, 29.99),
	(4, 3, 2, 149.99)
	ON CONFLICT (id) DO NOTHING;
	`

	// Execute migrations
	migrations := []string{
		createUsersTable, insertUsers,
		createServicesTable, insertServices,
		createOrdersTable, insertOrders,
		createOrderItemsTable, insertOrderItems,
	}

	for _, migration := range migrations {
		if _, err := db.Exec(migration); err != nil {
			log.Fatalf("Could not execute migration: %v", err)
		}
	}
}
