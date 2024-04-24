migrate:
	go run db/migrate.go

makemigration:
	migrate create -dir db/migrations -seq -digits 4 -ext .sql ${name}