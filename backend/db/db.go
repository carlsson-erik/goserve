package db

import (
	"database/sql"
	"log"
	"time"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func MigrateDB(db *sql.DB, database string) {

	time.Sleep(2 * time.Second)

	driver, err := postgres.WithInstance(db, &postgres.Config{})

	if err != nil {
		log.Printf("error %s", err)
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://db/migrations",
		database, driver)
	// m.Up() // or m.Steps(2) if you want to explicitly set the number of migrations to run

	if err != nil {
		log.Fatal(err)
	}

	if err := m.Up(); err != nil {
		log.Printf("Migration: %s", err)
	}

	log.Println("Successfully migrated")

}
