cd microservices/authentication/src
./genproto.sh
cd ../../..

cd microservices/account-operations/src/main
./genproto.sh
cd ../../../..

cd microservices/content-management
./genproto.sh
cd ../..
