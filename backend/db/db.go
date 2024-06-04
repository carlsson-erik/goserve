package db

import (
	"database/sql"
	. "goserve/.gen/v1/public/table"
	"goserve/graph/model"
	"log"
	"os"
	"time"

	"github.com/go-jet/jet/v2/postgres"
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

func Map[T, V any](ts []T, fn func(T) V) []V {
	result := make([]V, len(ts))
	for i, t := range ts {
		result[i] = fn(t)
	}
	return result
}

type DashboardService struct {
	DB *sql.DB
}

func (d DashboardService) Create(createData *model.NewDashboard) (*model.Dashboard, error) {
	insertQuery := Dashboard.INSERT(Dashboard.Name, Dashboard.Rows, Dashboard.Cols).MODEL(createData).RETURNING(Dashboard.AllColumns)

	res := model.Dashboard{}

	err := insertQuery.Query(d.DB, &res)

	return &res, err
}

func (d DashboardService) All() ([]*model.Dashboard, error) {
	var res []*model.Dashboard

	getQuery := Dashboard.SELECT(Dashboard.AllColumns).FROM(Dashboard)

	err := getQuery.Query(d.DB, &res)

	return res, err
}

func (d DashboardService) Delete(ids []int) ([]*model.Dashboard, error) {
	id_expressions := Map(ids, func(id int) postgres.Expression { return postgres.Int64(int64(id)) })
	res := []*model.Dashboard{}

	deleteQuery := Dashboard.DELETE().WHERE(Dashboard.ID.IN(id_expressions...))

	err := deleteQuery.Query(d.DB, &res)

	return res, err
}
