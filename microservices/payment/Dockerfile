FROM python:3.8

WORKDIR /app

COPY requirements-lock.txt .

RUN pip install -r requirements-lock.txt

COPY . .

ENV PORT 9000
EXPOSE 9000

CMD ["python", "main.py"]
