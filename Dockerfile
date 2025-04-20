FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY index.js .
COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

EXPOSE 443

ENTRYPOINT ["./entrypoint.sh"]
