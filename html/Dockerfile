FROM node:16

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g gulp
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

EXPOSE 80

CMD ["bash"]
