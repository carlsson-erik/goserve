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

func GetEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("No env file found. Skipping..")
		// log.Fatal(err)
	}

	host := GetEnv("DB_URL", "localhost")
	dbPort := GetEnv("DB_PORT", "5432")
	user := GetEnv("DB_USER", "postgres")
	password := GetEnv("DB_PASSWORD", "postgres")
	dbName := GetEnv("DB_DATABASE", "v1")

	connectString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, dbPort, user, password, dbName)

	dbsql, err := sql.Open("postgres", connectString)

	if err != nil {
		fmt.Println(connectString)
		log.Fatal(err)
	}

	db.MigrateDB(dbsql, dbName)

	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	}).Handler)

	// router.Use(AuthenticationMiddleware)

	dashboardService := service.DashboardService{DB: dbsql}
	templateService := service.TemplateService{DB: dbsql}
	tileService := service.TileService{DB: dbsql}
	variableService := service.VariableService{DB: dbsql}
	userService := service.UserService{DB: dbsql}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB:               dbsql,
		DashboardService: &dashboardService,
		TemplateService:  &templateService,
		TileService:      &tileService,
		VariableService:  &variableService,
		UserService:      &userService,
	}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	playgroundPort := "8081"

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", playgroundPort)
	log.Fatal(http.ListenAndServe(":"+playgroundPort, router))

}
