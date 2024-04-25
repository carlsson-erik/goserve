CREATE TABLE public.dashboard (
	id serial primary key,
	"name" varchar NOT NULL UNIQUE,
	"description" varchar NULL,
	"rows" int NOT NULL,
	cols int NOT NULL
);


CREATE TABLE public.tile (
	id serial primary key,
	"name" varchar NOT NULL UNIQUE,
	"description" varchar NULL,
	"row" int NOT NULL,
	col int NOT NULL,
	width int NOT NULL,
	height int NOT NULL,
	dashboard_id serial,
	CONSTRAINT fk_tile_dashboard FOREIGN KEY(dashboard_id) REFERENCES dashboard(id)
);