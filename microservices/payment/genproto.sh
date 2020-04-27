PYTHON=./env/bin/python

if [ "$1" = "container" ]
then
    PYTHON=$(which python)
fi

if [ ! -d "env" -a "$1" != "container" ]
then
    python3.8 -m venv env
    ./env/bin/pip install grpcio-tools==1.28.1
fi

mkdir -p proto

$PYTHON -m grpc_tools.protoc -I../../proto --python_out=./proto --grpc_python_out=./proto ../../proto/*

cd proto

for FILE in $(ls .)
do
    if [[ $FILE == *grpc.py ]]
    then
        sed -i '4s/^/from . /' $FILE
    fi
done