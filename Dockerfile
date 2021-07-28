FROM node:14.16.1-alpine3.10

RUN apk update && apk upgrade && \
    apk add --no-cache yarn

WORKDIR /usr/src/app





RUN cd /usr/src/app/
COPY package.json ./
COPY . .

RUN yarn run clean-reinstall
RUN yarn run build

ENV PORT 3000

EXPOSE 3000

CMD ["yarn", "start"]