CREATE TABLE public.dashboard (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	"rows" int NOT NULL,
	cols int NOT NULL
);


CREATE TABLE public.tile (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	"row" int NOT NULL,
	col int NOT NULL,
	width int NOT NULL,
	height int NOT NULL
);

ALTER TABLE public.tile ADD CONSTRAINT tile_pk PRIMARY KEY (id);

ALTER TABLE public.dashboard ADD CONSTRAINT dashboard_pk PRIMARY KEY (id);

ALTER TABLE public.dashboard ADD CONSTRAINT dashboard_tile_fk FOREIGN KEY (id) REFERENCES public.tile(id);


