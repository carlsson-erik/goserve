CREATE TABLE public.users (
	id serial primary key,
    "username" varchar NOT NULL CHECK (name <> ''),
    "password" varchar NOT NULL CHECK (name <> ''),
	"name" varchar NOT NULL CHECK (name <> '')
);

CREATE TABLE public.auth (
	"user_id" serial,
	"value" varchar,
	CONSTRAINT fk_auth_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);