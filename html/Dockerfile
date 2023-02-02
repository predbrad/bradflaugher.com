FROM node:11.15.0

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g gulp

COPY package.json ./
RUN npm install -g

EXPOSE 3000
EXPOSE 3001

CMD ["bash"]
