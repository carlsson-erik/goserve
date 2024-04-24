
Fronend dependencies
  Node
    Install node on your system. a command, npm will come when you install node. npm is a package manager

Install yarn (via npm)
1. npm -g install yarn

Clone the repo

Start frontend
1. cd frontend
2. yarn (install dependencies, optional. Needs to run command in the frontend directory)
3. yarn dev

Start backend
1. cd backend
2. go run server.go


Backend Stack:
Golang is used as our backend language.
We have a Postgres db to store data in.
We use Golang-migrate to run migrations. (If we have deployed a container running with goserve and we want to update it, then we likely also made changes to its sql tables. On startup, Golang-migrate will run all new sql files and sequentially apply them.)
We use GraphQL in our go backend instead of a REST API, mostly for fun. Pros are that we don't need to keep track of urls and make them restful. We can tell graphql exactly what objects(tables) we want.
We use jet to contact postgres. Jet is a query builder that allows us to make sql queries. It also generated types from the database tables, to make everything type safe.

Install:
Golang-migrate CLI - https://github.com/golang-migrate/migrate/tree/master/cmd/migrate
Jet CLI - go install github.com/go-jet/jet/v2/cmd/jet@latest

Migrate commands(Must be in backend folder goserve/backend):

1. Create a new migration
migrate create -dir db/migrations -seq -digits 4 -ext .sql <Name>

2. Apply all new migrations
Apply migrations at restart of the go server

3. Revert all migrations
cd backend/
migrate -path db/migrations --database "postgresql://postgres:postgres@localhost:5432/v1?sslmode=disable" -verbose down

Generate jet types:
cd backend/
jet -dsn="postgresql://postgres:postgres@localhost:5432/v1?sslmode=disable" -schema=public -path=./gen

