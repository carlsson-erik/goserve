package main

import (
	// "context"
	"database/sql"
	"fmt"
	"goserve/db"
	"goserve/graph"
	"goserve/service"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("No env file found. Skipping...")
		// log.Fatal(err)
	}

	db.MigrateDB()

	host := os.Getenv("DB_URL")
	dbPort := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_DATABASE")

	connectString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, dbPort, user, password, dbName)

	db, err := sql.Open("postgres", connectString)

	if err != nil {
		fmt.Println(connectString)
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

	// router.Use(AuthenticationMiddleware)

	dashboardService := service.DashboardService{DB: db}
	templateService := service.TemplateService{DB: db}
	tileService := service.TileService{DB: db}
	variableService := service.VariableService{DB: db}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db, DashboardService: &dashboardService, TemplateService: &templateService, TileService: &tileService, VariableService: &variableService}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	playgroundPort := "8081"

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", playgroundPort)
	log.Fatal(http.ListenAndServe(":"+playgroundPort, router))

}
