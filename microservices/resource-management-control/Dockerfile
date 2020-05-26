FROM node:13.11.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV PORT 9000
EXPOSE 9000

CMD ["yarn", "start"]
