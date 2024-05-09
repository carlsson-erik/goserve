package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"fmt"
	. "goserve/.gen/v1/public/table"
	"goserve/graph/model"
	"log"

	"github.com/go-jet/jet/v2/postgres"
)

// CreateDashboard is the resolver for the createDashboard field.
func (r *mutationResolver) CreateDashboard(ctx context.Context, input model.NewDashboard) (*model.Dashboard, error) {
	newDashboard := model.Dashboard{
		Name: input.Name,
		Rows: 6,
		Cols: 8,
	}
	insertQuery := Dashboard.INSERT(Dashboard.Name, Dashboard.Rows, Dashboard.Cols).MODEL(newDashboard).RETURNING(Dashboard.AllColumns)

	res := model.Dashboard{}

	err := insertQuery.Query(r.DB, &res)

	if err != nil {
		log.Printf("Insert error: %v", err)
		return nil, err
	}

	return &res, err
}

// DeleteDashboard is the resolver for the deleteDashboard field.
func (r *mutationResolver) DeleteDashboard(ctx context.Context, id int) (*model.Dashboard, error) {
	deleteQuery := Dashboard.DELETE().WHERE(Dashboard.ID.EQ(postgres.Int(int64(id)))).RETURNING(Dashboard.AllColumns)

	res := model.Dashboard{}

	err := deleteQuery.Query(r.DB, &res)

	if err != nil {
		log.Printf("Insert failed: %v", err)
		return nil, err
	}

	return &res, err
}

// CreateTile is the resolver for the createTile field.
func (r *mutationResolver) CreateTile(ctx context.Context, input model.NewTile) (*model.Tile, error) {
	newTile := model.Tile{
		Name:        input.Name,
		Description: input.Description,
		Row:         input.Row,
		Col:         input.Col,
		Width:       1,
		Height:      1,
	}
	insertQuery := Tile.INSERT(Tile.AllColumns).MODEL(newTile).RETURNING(Tile.AllColumns)

	res := model.Tile{}

	err := insertQuery.Query(r.DB, &res)

	if err != nil {
		log.Printf("Insert failed: %v", err)
		return nil, err
	}

	return &res, err
}

// DeleteTile is the resolver for the deleteTile field.
func (r *mutationResolver) DeleteTile(ctx context.Context, id int) (*model.Tile, error) {
	panic(fmt.Errorf("not implemented: DeleteTile - deleteTile"))
}

// Dashboards is the resolver for the dashboards field.
func (r *queryResolver) Dashboards(ctx context.Context) ([]*model.Dashboard, error) {
	var getDest []*model.Dashboard

	getQuery := postgres.SELECT(Dashboard.AllColumns).FROM(Dashboard)

	err := getQuery.Query(r.DB, &getDest)

	return getDest, err
}

// Dashboard is the resolver for the dashboard field.
func (r *queryResolver) Dashboard(ctx context.Context, id int) (*model.Dashboard, error) {
	var res *model.Dashboard

	getQuery := postgres.SELECT(Dashboard.AllColumns).FROM(Dashboard).WHERE(Dashboard.ID.EQ(postgres.Int(int64(id))))

	err := getQuery.Query(r.DB, &res)

	return res, err
}

// Tiles is the resolver for the tiles field.
func (r *queryResolver) Tiles(ctx context.Context) ([]*model.Tile, error) {
	var res []*model.Tile

	getQuery := postgres.SELECT(Tile.AllColumns).FROM(Tile)

	err := getQuery.Query(r.DB, &res)

	return res, err
}

// Tile is the resolver for the tile field.
func (r *queryResolver) Tile(ctx context.Context, id int) (*model.Tile, error) {
	var res *model.Tile

	getQuery := postgres.SELECT(Tile.AllColumns).FROM(Tile).WHERE(Tile.ID.EQ(postgres.Int(int64(id))))

	err := getQuery.Query(r.DB, &res)

	return res, err
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
