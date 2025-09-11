package db

import (
	"fmt"
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
	db_user := os.Getenv("DB_USER")
	db_password := os.Getenv("DB_PASSWORD")

	time.Sleep(2 * time.Second)

	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		db_user,
		db_password,
		db_url,
		db_port,
		db_database,
	)

	m, err := migrate.New(
		"file://db/migrations",
		dsn)
	if err != nil {
		log.Printf("Failed migration to db: DB_URL: %s", dsn)
		log.Fatal(err)
	}

	if err := m.Up(); err != nil {
		log.Printf("Migration: %s", err)
	}

	log.Println("Successfully migrated")

}
