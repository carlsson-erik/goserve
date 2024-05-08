package main

import (
	"database/sql"
	"fmt"
	"goserve/db"
	"goserve/graph"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

const defaultPlaygroundPort = "8081"

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal(err)
	}

	db.MigrateDB()

	playgroudPort := os.Getenv("PLAYGROUND_PORT")
	if playgroudPort == "" {
		playgroudPort = defaultPlaygroundPort
	}

	host := os.Getenv("DB_URL")
	dbPort := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_DATABASE")

	connectString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, dbPort, user, password, dbName)

	db, err := sql.Open("postgres", connectString)

	if err != nil {
		log.Fatal(err)
	}

	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	}).Handler)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", playgroudPort)
	log.Fatal(http.ListenAndServe(":"+playgroudPort, router))
}
