#!/bin/bash

# Compiling proto
mkdir -p src/proto

cd ..
ROOT_DIR=$(pwd)

for FILE in $(ls proto)
do
    protoc -I $ROOT_DIR/proto $FILE --js_out=import_style=commonjs:$ROOT_DIR/client/src/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$ROOT_DIR/client/src/proto
done


# Adding eslint-disable
cd client/src/proto

for FILE in $(ls .)
do
    sed -i '1s/^/\/* eslint-disable *\/\n /' $FILE
done
