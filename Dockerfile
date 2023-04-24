FROM node

WORKDIR /app
COPY app /app

RUN npm install

RUN groupadd -r myuser && useradd -r -g myuser myuser
EXPOSE 3000

USER myuser
CMD node server.js
