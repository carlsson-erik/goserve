Install yarn
1. npm -g install yarn

Start frontend
1. cd frontend
2. yarn (install dependencies, optional)
3. yarn dev

Start backend
1. cd backend
2. go run server.go


Backend Stack:
Golang is used as our backend language.
We have a Postgres db to store data in.
We use Golang-migrate to run migrations. (If we have deployed a container running with goserve and we want to update it, then we likely also made changes to its sql tables. On startup, Golang-migrate will run all new sql files and sequentially apply them.)
We use GraphQL in our go backend instead of a REST API, mostly for fun. Pros are that we don't need to keep track of urls and make them restful. We can tell graphql exactly what objects(tables) we want.

Install:
Golang-migrate CLI
https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

Migrate commands(Must be in backend folder goserve/backend):

Create a new migration
migrate create -dir db/migrations -seq -digits 4 -ext .sql <Name>

Apply all new migrations
Apply migrations at restart of the go server

Revert all migrations
migrate -path db/migrations --database "postgresql://postgres:postgres@localhost:5432/v1?sslmode=disable" -verbose down
