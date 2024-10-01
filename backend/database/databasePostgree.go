package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

// Connect establishes a connection to the PostgreSQL database
func Connect(username, password, dbname, host, port string) error {
    dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
    var err error
    db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return err
    }
    log.Println("Database connection established")
    return nil
}


// GetDB returns the current database connection
func GetDB() *gorm.DB {
    return db
}
