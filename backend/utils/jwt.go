package utils

import (
	"time"
	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

func GenerateJWT(userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
		"exp":    time.Now().Add(time.Hour * 72).Unix(),
	})
	return token.SignedString(jwtKey)
}

func ValidateJWT(tokenString string) bool {
	// Validate token
	// ...
	return true
}
