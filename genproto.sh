#!/bin/bash

cd microservices/authentication
./genproto.sh
cd ../..

cd microservices/content-management
./genproto.sh
cd ../..

cd microservices/payment
./genproto.sh
cd ../..

cd microservices/resource-management-control
./genproto.sh
cd ../..
