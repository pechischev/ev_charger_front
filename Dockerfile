FROM node:alpine

WORKDIR /devel

COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]