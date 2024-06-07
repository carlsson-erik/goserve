CREATE TABLE public.dashboard (
	id serial primary key,
	"name" varchar NOT NULL UNIQUE CHECK (name <> ''),
	"rows" int NOT NULL,
	"cols" int NOT NULL
);

CREATE TABLE public.template (
	id serial primary key,
	"name" varchar NOT NULL UNIQUE CHECK (name <> ''),
	"data" varchar NOT NULL,
	"width" int NOT NULL,
	"height" int NOT NULL
);

CREATE TABLE public.tile (
	id serial primary key,
	"name" varchar NOT NULL CHECK (name <> ''),
	"row" int NOT NULL,
	"col" int NOT NULL,
	"width" int NOT NULL,
	"height" int NOT NULL,
	"dashboard_id" serial,
	"template_id" serial,
	CONSTRAINT fk_tile_dashboard FOREIGN KEY(dashboard_id) REFERENCES dashboard(id) ON DELETE CASCADE,
	CONSTRAINT fk_tile_template FOREIGN KEY(template_id) REFERENCES template(id) on DELETE CASCADE
);

CREATE TABLE public.variable (
	id serial primary key,
	"name" varchar NOT NULL CHECK (name <> ''),
	"value" varchar,
	"default" varchar NULL,
	"template_id" int NULL,
	"tile_id" int NULL,
	CONSTRAINT fk_variable_template FOREIGN KEY(template_id) REFERENCES template(id) on DELETE CASCADE,
	CONSTRAINT fk_variable_tile FOREIGN KEY(tile_id) REFERENCES tile(id) on DELETE CASCADE
);
