package auth

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
)

// HTTP middleware setting a value on the request context
func AuthenticationMiddleware(next http.Handler, db sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Hej")
		auth, err := r.Cookie("authentication")

		if err != nil {
			fmt.Println("No authentication token provided")

		}

		fmt.Println(auth)
		// create new context from `r` request context, and assign key `"user"`
		// to value of `"123"`
		ctx := context.WithValue(r.Context(), "user", "123")

		// call the next handler in the chain, passing the response writer and
		// the updated request object with the new context value.
		//
		// note: context.Context values are nested, so any previously set
		// values will be accessible as well, and the new `"user"` key
		// will be accessible from this point forward.
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
