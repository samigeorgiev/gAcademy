#!/bin/bash

docker run --name gacademy_database -e POSTGRES_PASSWORD=postgres -e PGPASSWORD=postgres --network=host --rm -d postgres
docker cp ./prepare-db.sql gacademy_database:/prepare-db.sql
docker exec gacademy_database sleep 1
docker exec gacademy_database psql -U postgres -f prepare-db.sql
