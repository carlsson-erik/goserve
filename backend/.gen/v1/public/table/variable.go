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

var Variable = newVariableTable("public", "variable", "")

type variableTable struct {
	postgres.Table

	// Columns
	ID         postgres.ColumnInteger
	Name       postgres.ColumnString
	Value      postgres.ColumnString
	Default    postgres.ColumnString
	TemplateID postgres.ColumnInteger
	TileID     postgres.ColumnInteger

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type VariableTable struct {
	variableTable

	EXCLUDED variableTable
}

// AS creates new VariableTable with assigned alias
func (a VariableTable) AS(alias string) *VariableTable {
	return newVariableTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new VariableTable with assigned schema name
func (a VariableTable) FromSchema(schemaName string) *VariableTable {
	return newVariableTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new VariableTable with assigned table prefix
func (a VariableTable) WithPrefix(prefix string) *VariableTable {
	return newVariableTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new VariableTable with assigned table suffix
func (a VariableTable) WithSuffix(suffix string) *VariableTable {
	return newVariableTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newVariableTable(schemaName, tableName, alias string) *VariableTable {
	return &VariableTable{
		variableTable: newVariableTableImpl(schemaName, tableName, alias),
		EXCLUDED:      newVariableTableImpl("", "excluded", ""),
	}
}

func newVariableTableImpl(schemaName, tableName, alias string) variableTable {
	var (
		IDColumn         = postgres.IntegerColumn("id")
		NameColumn       = postgres.StringColumn("name")
		ValueColumn      = postgres.StringColumn("value")
		DefaultColumn    = postgres.StringColumn("default")
		TemplateIDColumn = postgres.IntegerColumn("template_id")
		TileIDColumn     = postgres.IntegerColumn("tile_id")
		allColumns       = postgres.ColumnList{IDColumn, NameColumn, ValueColumn, DefaultColumn, TemplateIDColumn, TileIDColumn}
		mutableColumns   = postgres.ColumnList{NameColumn, ValueColumn, DefaultColumn, TemplateIDColumn, TileIDColumn}
	)

	return variableTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:         IDColumn,
		Name:       NameColumn,
		Value:      ValueColumn,
		Default:    DefaultColumn,
		TemplateID: TemplateIDColumn,
		TileID:     TileIDColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
