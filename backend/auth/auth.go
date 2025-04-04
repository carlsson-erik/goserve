package auth

import (
	"golang.org/x/crypto/bcrypt"
)

type LoginDetails struct {
	username string
	Password string
}

type Auth struct {
	Token string
	User  string
}

func hashPassword(password string) (string, error) {
	hashedPassword, error := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if error != nil {
		return "", error
	}

	return string(hashedPassword), nil
}

func CompareHashAndPassword(hashedPassword string, password string) bool {
	error := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if error != nil {
		return false
	}
	return true
}

func handleLogin(username string, password string) {

	// hämta användare

	// kolla lösenord

	// generera token

	// returnera token
}
