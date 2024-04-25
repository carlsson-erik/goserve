package db

import (
	"log"
	"os"
	"time"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func MigrateDB() {
	db_url := os.Getenv("DB_URL")
	db_port := os.Getenv("DB_PORT")
	db_database := os.Getenv("DB_DATABASE")

	time.Sleep(2 * time.Second)

	m, err := migrate.New(
		"file://db/migrations",
		"postgres://postgres:postgres@"+db_url+":"+db_port+"/"+db_database+"?sslmode=disable")
	if err != nil {
		log.Println("1")
		log.Fatal(err)
	}

	if err := m.Up(); err != nil {
		log.Printf("Migration: %s", err)
	}

	log.Println("Successfully migrated")

}
