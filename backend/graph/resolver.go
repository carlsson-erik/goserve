package graph

import (
	"database/sql"
	"goserve/service"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB               *sql.DB
	DashboardService *service.DashboardService
	TemplateService  *service.TemplateService
	TileService      *service.TileService
	VariableService  *service.VariableService
}
