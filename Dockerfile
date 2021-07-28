FROM node:14.16.1-alpine3.10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm run clean-reinstall

COPY . ./

RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]