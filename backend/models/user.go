package models

import (
	"backend/utils"
	"encoding/json"
	"time"

	"gorm.io/gorm"
)

type User struct {
    ID           uint      `gorm:"primaryKey" json:"id,omitempty"`
    Username     string    `json:"username"`
    PhotoURL     string    `json:"photo_url,omitempty"`
    FaceEncoding string    `json:"face_encoding,omitempty"`
    CreatedAt    time.Time `json:"created_at"`
    Email        string    `gorm:"size:255;unique;not null" json:"email"`
    Password     string    `gorm:"size:255;not null" json:"-"` // Password should be hashed
    JWTToken     string    `gorm:"size:500" json:"jwt_token,omitempty"`
    Preferences  string    `json:"preferences,omitempty" gorm:"type:json"` // Store as JSON string
}

// Credentials struct for handling login requests
type Credentials struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

// Validate checks if the provided credentials match the user's credentials
func (u *User) Validate(credentials Credentials) *User {
    if u.Email == credentials.Email && utils.CheckPasswordHash(credentials.Password, u.Password) {
        return u
    }
    return nil
}

// Save saves the user to the database
func (u *User) Save(db *gorm.DB) error {
    // Convert preferences slice to JSON string
    if len(u.Preferences) > 0 {
        jsonPreferences, err := json.Marshal(u.Preferences)
        if err != nil {
            return err
        }
        u.Preferences = string(jsonPreferences)
    }
    return db.Create(u).Error
}

// GetByEmail fetches user by email from the PostgreSQL database
func GetByEmail(db *gorm.DB, email string) (*User, error) {
    var user User
    err := db.Where("email = ?", email).First(&user).Error
    return &user, err
}

// ValidateCredentials checks if the provided email and password match the stored credentials
func (u *User) ValidateCredentials(db *gorm.DB, email, password string) (bool, error) {
    foundUser, err := GetByEmail(db, email)
    if err != nil {
        return false, err
    }
    // Check if the provided password matches the stored hashed password
    return utils.CheckPasswordHash(password, foundUser.Password), nil
}
