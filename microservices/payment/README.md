# Payment microservice

## Requirements

- python:3.8

## Configuring

You should provide these environments variables:

- DB_URL
- PAYPAL_MODE
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET

## Running

Create virtual environment:

`$ python -m venv env`

Activate created environment:

`$ source env/bin/activate`

Install dependencies:

`$ pip install -r requirements-lock.txt`

Generate proto files:

`$ ./genproto.sh`

Start:

`$ python main.py`

## Linting

All `.py` files should be linted with `flake8`.
