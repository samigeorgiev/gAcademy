FROM node:13.11.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV PORT 8000
EXPOSE 8000

CMD ["yarn", "start"]
