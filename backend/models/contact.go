package models

import "gorm.io/gorm"

// Contact represents a contact form submission
type Contact struct {
    gorm.Model            // Adds fields `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt`
    Name      string `gorm:"column:name;not null"`
    Email     string `gorm:"column:email;unique;not null"`
    Message   string `gorm:"column:message;not null"`
}
