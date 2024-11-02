package config

import (
	"log"

	"github.com/joho/godotenv"
	"os"
)

type Config struct {
	DBDriver   string
	DBSource   string
	JWTSecret  string
	PostgresURI string
}

func LoadConfig() Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return Config{
		DBDriver:  os.Getenv("DB_DRIVER"),
		DBSource:  os.Getenv("DB_SOURCE"),
		PostgresURI: os.Getenv("POSTGRESQL_URI"),
	}
}
