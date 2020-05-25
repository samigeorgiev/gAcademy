FROM node:13.11.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV PORT 9001
EXPOSE 9001

CMD ["yarn", "start"]
