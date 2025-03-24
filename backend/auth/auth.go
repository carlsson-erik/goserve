package auth

type LoginDetails struct {
	Email    string
	Password string
}

type Auth struct {
	Token string
	User  string
}
