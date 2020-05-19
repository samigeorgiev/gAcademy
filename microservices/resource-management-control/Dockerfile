FROM node:13.11.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV PORT 8004
EXPOSE 8004

CMD ["yarn", "start"]
