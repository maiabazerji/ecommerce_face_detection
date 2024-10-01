package models

import (

	"gorm.io/gorm" 
)

type Product struct {
	ID           uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string  `gorm:"size:255;not null" json:"name"`
	Brand        string  `gorm:"size:255;not null" json:"brand"`
	Price        float64 `gorm:"not null" json:"price"`
	Category     string  `gorm:"size:255;not null" json:"category"`
	Quantity     int     `gorm:"not null" json:"quantity"`
	Rating       float64 `json:"rating"`
	NumReviews   int     `json:"numReviews"`
	CountInStock int     `json:"countInStock"`
	ImageURL     string  `gorm:"size:255" json:"image_url"`
}

// Save inserts or updates the product in the database
func (p *Product) Save(db *gorm.DB) error {
	return db.Save(p).Error
}

// GetAllProducts fetches all products from the database
func GetAllProducts(db *gorm.DB) ([]Product, error) {
	var products []Product
	result := db.Find(&products)
	return products, result.Error
}

// GetProductById fetches a product by its ID from the database
func GetProductById(db *gorm.DB, id uint) (Product, error) {
	var product Product
	result := db.First(&product, id)
	return product, result.Error
}

// DeleteProduct removes a product by its ID
func DeleteProduct(db *gorm.DB, id uint) error {
	return db.Delete(&Product{}, id).Error
}
