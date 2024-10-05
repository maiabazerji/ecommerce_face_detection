package database

import (
	"fmt"
	"log"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db   *gorm.DB
	once sync.Once // Ensures database connection is initialized only once
)

// Connect establishes a connection to the PostgreSQL database
func Connect(username, password, dbname, host, port string) error {
	var err error
	once.Do(func() {
		dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
		log.Println("Connecting to database with DSN:", dsn)
		
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Printf("Could not connect to database: %v\n", err)
		} else {
			log.Println("Database connection established")
		}
	})
	return err
}

// GetDB returns the instance of the database connection
func GetDB() *gorm.DB {
	return db
}
