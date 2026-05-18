# api/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=secret
ENV DB_NAME=tododb
ENV JWT_SECRET=changeme_use_a_long_random_string
CMD ["node", "server.js"]