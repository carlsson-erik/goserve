//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package table

import (
	"github.com/go-jet/jet/v2/postgres"
)

var Tile = newTileTable("public", "tile", "")

type tileTable struct {
	postgres.Table

	// Columns
	ID          postgres.ColumnInteger
	Name        postgres.ColumnString
	Row         postgres.ColumnInteger
	Col         postgres.ColumnInteger
	Width       postgres.ColumnInteger
	Height      postgres.ColumnInteger
	DashboardID postgres.ColumnInteger
	TemplateID  postgres.ColumnInteger

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type TileTable struct {
	tileTable

	EXCLUDED tileTable
}

// AS creates new TileTable with assigned alias
func (a TileTable) AS(alias string) *TileTable {
	return newTileTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new TileTable with assigned schema name
func (a TileTable) FromSchema(schemaName string) *TileTable {
	return newTileTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new TileTable with assigned table prefix
func (a TileTable) WithPrefix(prefix string) *TileTable {
	return newTileTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new TileTable with assigned table suffix
func (a TileTable) WithSuffix(suffix string) *TileTable {
	return newTileTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newTileTable(schemaName, tableName, alias string) *TileTable {
	return &TileTable{
		tileTable: newTileTableImpl(schemaName, tableName, alias),
		EXCLUDED:  newTileTableImpl("", "excluded", ""),
	}
}

func newTileTableImpl(schemaName, tableName, alias string) tileTable {
	var (
		IDColumn          = postgres.IntegerColumn("id")
		NameColumn        = postgres.StringColumn("name")
		RowColumn         = postgres.IntegerColumn("row")
		ColColumn         = postgres.IntegerColumn("col")
		WidthColumn       = postgres.IntegerColumn("width")
		HeightColumn      = postgres.IntegerColumn("height")
		DashboardIDColumn = postgres.IntegerColumn("dashboard_id")
		TemplateIDColumn  = postgres.IntegerColumn("template_id")
		allColumns        = postgres.ColumnList{IDColumn, NameColumn, RowColumn, ColColumn, WidthColumn, HeightColumn, DashboardIDColumn, TemplateIDColumn}
		mutableColumns    = postgres.ColumnList{NameColumn, RowColumn, ColColumn, WidthColumn, HeightColumn, DashboardIDColumn, TemplateIDColumn}
	)

	return tileTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:          IDColumn,
		Name:        NameColumn,
		Row:         RowColumn,
		Col:         ColColumn,
		Width:       WidthColumn,
		Height:      HeightColumn,
		DashboardID: DashboardIDColumn,
		TemplateID:  TemplateIDColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
