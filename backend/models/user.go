package models

import (

	"time"

	"gorm.io/gorm"
)


// models/user.go
type User struct {
    ID          uint      `gorm:"primaryKey"`
    Username    string    `gorm:"column:username"`
    Password    string    `gorm:"column:password"`
    Email       string    `gorm:"column:email" unique:"true"`
    CreatedAt   time.Time `gorm:"column:created_at"`
}

// Credentials struct for handling login requests
type Credentials struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}



// GetByEmail fetches user by email from the PostgreSQL database
func GetByEmail(db *gorm.DB, email string) (*User, error) {
	var user User
	err := db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err // Return nil user if not found
	}
	return &user, nil
}

