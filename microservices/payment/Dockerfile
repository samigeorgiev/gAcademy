FROM python:3.8

WORKDIR /app

COPY requirements-lock.txt .

RUN pip install -r requirements-lock.txt

COPY . .

ENV PORT 9003
EXPOSE 9003

CMD ["python", "main.py"]