FROM node:lts

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g gulp

COPY package.json ./
RUN npm install

EXPOSE 3000
EXPOSE 3001

CMD ["bash"]
