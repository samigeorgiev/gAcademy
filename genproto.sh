cd microservices/authentication/src
./genproto.sh
cd ../../..

cd microservices/content-management/src/main
./genproto.sh
cd ../../../..

cd microservices/payment
./genproto.sh
cd ../..
