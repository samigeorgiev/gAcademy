#!/bin/bash

cd microservices/authentication/src
./genproto.sh
cd ../../..

cd microservices/content-management/src/main
./genproto.sh
cd ../../../..

cd microservices/payment
./genproto.sh
cd ../..

cd microservices/resource-management-control/src
./genproto.sh
cd ../../..

cd microservices/resource-management/src
./genproto.sh
cd ../../..
