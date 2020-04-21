docker run --name authentication_it_db -e POSTGRES_PASSWORD=postgres -e PGPASSWORD=postgres -p 5432:5432 --rm -d postgres
docker cp ./prepare-db.sql authentication_it_db:/prepare-db.sql
docker exec authentication_it_db sleep 1
docker exec authentication_it_db psql -U postgres -f prepare-db.sql