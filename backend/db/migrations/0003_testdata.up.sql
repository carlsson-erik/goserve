CREATE TABLE public.user (
	id serial primary key,
    "username" varchar NOT NULL (name <> '')
    "password" varchar NOT NULL  (name <> '')
	"name" varchar NOT NULL CHECK (name <> ''),
);

CREATE TABLE public.auth (
	"user_id" serial,
	"value" varchar,
	CONSTRAINT fk_auth_user FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
);