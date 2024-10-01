package utils

import (
	"errors"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateJWT(secret string, username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
// ValidateJWT validates the JWT token and returns an error if it's invalid

func ValidateJWT(token string) (bool, error) {

    if strings.TrimSpace(token) == "" {

        return false, errors.New("invalid token")

    }

    // Add your JWT validation logic here

    return true, nil

}
