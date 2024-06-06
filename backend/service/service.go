package service

import (
	"database/sql"
	. "goserve/.gen/v1/public/table"
	"goserve/graph/model"
	"log"

	"github.com/go-jet/jet/v2/postgres"
)

type DashboardService struct {
	DB *sql.DB
}

func (d DashboardService) Create(createData model.NewDashboard) (*model.Dashboard, error) {
	insertQuery := Dashboard.INSERT(Dashboard.MutableColumns).MODEL(createData).RETURNING(Dashboard.AllColumns)

	res := model.Dashboard{}

	err := insertQuery.Query(d.DB, &res)

	if err != nil {
		log.Printf("Insert dashboard failed: %v", err)
		return nil, err
	}

	return &res, err
}

func (d DashboardService) All() ([]*model.Dashboard, error) {
	var res []*model.Dashboard

	getQuery := Dashboard.SELECT(Dashboard.AllColumns).FROM(Dashboard)

	err := getQuery.Query(d.DB, &res)

	if err != nil {
		log.Printf("Get dashboard failed: %v", err)
		return nil, err
	}

	return res, err
}

func (d DashboardService) Delete(id int) (*model.Dashboard, error) {
	var res model.Dashboard

	deleteQuery := Dashboard.DELETE().WHERE(Dashboard.ID.EQ(postgres.Int64(int64(id)))).RETURNING(Dashboard.AllColumns)

	err := deleteQuery.Query(d.DB, &res)

	if err != nil {
		log.Printf("Delete dashboard failed: %v", err)
		return nil, err
	}

	return &res, err
}

type TileService struct {
	DB *sql.DB
}

func (t TileService) Create(createData model.NewTile) (*model.Tile, error) {

	insertQuery := Tile.INSERT(Tile.MutableColumns).MODEL(createData).RETURNING(Tile.AllColumns)

	tileRes := model.Tile{}

	err := insertQuery.Query(t.DB, &tileRes)

	if err != nil {
		log.Printf("Insert tile failed: %v", err)
		return nil, err
	}

	variableService := VariableService{t.DB}

	var variables []*model.Variable

	for _, variable := range createData.Variables {
		variable.TileID = &tileRes.ID
		res, err := variableService.Create(*variable)

		if err != nil {
			log.Printf("Insert variable in tile create failed: %v", err)
			return nil, err
		}

		variables = append(variables, res)
	}

	tileRes.Variables = variables

	return &tileRes, err
}

func (t TileService) All() ([]*model.Tile, error) {
	var res []*model.Tile

	getQuery := Tile.SELECT(Tile.AllColumns).FROM(Tile)

	err := getQuery.Query(t.DB, &res)

	if err != nil {
		log.Printf("Get all tiles error: %v", err)
		return nil, err
	}

	return res, err
}

func (t TileService) Get(id int) (*model.Tile, error) {
	var res model.Tile

	getQuery := Tile.SELECT(Tile.AllColumns).WHERE(Tile.ID.EQ(postgres.Int64(int64(id))))

	err := getQuery.Query(t.DB, &res)

	if err != nil {
		log.Printf("Get tile error: %v", err)
		return nil, err
	}

	return &res, err
}

func (t TileService) Delete(id int) (*model.Tile, error) {
	var res model.Tile

	deleteQuery := Tile.DELETE().WHERE(Tile.ID.EQ(postgres.Int64(int64(id)))).RETURNING(Tile.AllColumns)

	err := deleteQuery.Query(t.DB, &res)

	if err != nil {
		log.Printf("Delete tile error: %v", err)
		return nil, err
	}

	return &res, err
}

type VariableService struct {
	DB *sql.DB
}

func (v VariableService) Create(createData model.NewVariable) (*model.Variable, error) {

	var res model.Variable

	insertQuery := Variable.INSERT(Variable.MutableColumns).MODEL(createData).RETURNING(Variable.AllColumns)

	err := insertQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Insert variable error: %v", err)
		return nil, err
	}

	return &res, err
}

func (v VariableService) All() ([]*model.Variable, error) {
	var res []*model.Variable

	getQuery := Variable.SELECT(Variable.AllColumns).FROM(Variable)

	err := getQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Get variable error: %v", err)
		return nil, err
	}

	return res, err
}

func (v VariableService) Delete(id int) (*model.Variable, error) {
	var res model.Variable

	deleteQuery := Variable.DELETE().WHERE(Variable.ID.EQ(postgres.Int64(int64(id)))).RETURNING(Variable.AllColumns)

	err := deleteQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Delete variable error: %v", err)
		return nil, err
	}

	return &res, err
}

type TemplateService struct {
	DB *sql.DB
}

func (v TemplateService) Create(createData model.NewTemplate) (*model.Template, error) {

	var res model.Template

	insertQuery := Template.INSERT(Template.MutableColumns).MODEL(createData).RETURNING(Template.AllColumns)

	err := insertQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Insert template error: %v", err)
		return nil, err
	}

	variableService := VariableService{DB: v.DB}

	var variables []*model.Variable

	for _, variable := range createData.Variables {
		variable.TemplateID = &res.ID
		res, err := variableService.Create(*variable)

		if err != nil {
			log.Printf("Insert variable in template create error: %v", err)
			return nil, err
		}
		variables = append(variables, res)
	}

	res.Variables = variables

	return &res, err
}

func (v TemplateService) All() ([]*model.Template, error) {
	var res []*model.Template

	getQuery := Template.SELECT(Template.AllColumns).FROM(Template)

	err := getQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Get templates error: %v", err)
		return nil, err
	}

	return res, err
}

func (v TemplateService) Get(id int) (*model.Template, error) {
	var res *model.Template

	getQuery := Template.SELECT(Template.AllColumns).WHERE(Template.ID.EQ(postgres.Int64(int64(id))))

	err := getQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Get template error: %v", err)
		return nil, err
	}

	return res, err
}

func (v TemplateService) Delete(id int) (*model.Template, error) {
	var res model.Template

	deleteQuery := Template.DELETE().WHERE(Template.ID.EQ(postgres.Int64(int64(id)))).RETURNING(Template.AllColumns)

	err := deleteQuery.Query(v.DB, &res)

	if err != nil {
		log.Printf("Delete template error: %v", err)
		return nil, err
	}

	return &res, err
}
