package auth

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type LoginDetails struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Auth struct {
	Token string `json:"token"`
	User  string `json:"user"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func getJWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET_KEY")
	if secret == "" {
		panic("JWT_SECRET_KEY is not set")
	}
	return []byte(secret)
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func IsBCryptHash(value string) bool {
	if len(value) != 60 {
		return false
	}
	return strings.HasPrefix(value, "$2a$") || strings.HasPrefix(value, "$2b$") || strings.HasPrefix(value, "$2y$")
}

func HashPasswordForStorage(password string) (string, error) {
	if password == "" {
		return "", errors.New("password must not be empty")
	}

	if IsBCryptHash(password) {
		return password, nil
	}

	return HashPassword(password)
}

func CompareHashAndPassword(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func GenerateToken(username string) (string, error) {
	claims := Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(getJWTSecret())
}

func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return getJWTSecret(), nil
	})

	if err != nil {
		return nil, err
	}
	if !token.Valid || token.Method != jwt.SigningMethodHS256 {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

func HandleLogin(username, password, hashedPassword string) (*Auth, error) {
	// Validate password
	if !CompareHashAndPassword(hashedPassword, password) {
		return nil, errors.New("invalid credentials")
	}

	// Generate token
	token, err := GenerateToken(username)
	if err != nil {
		return nil, err
	}

	return &Auth{
		Token: token,
		User:  username,
	}, nil
}
