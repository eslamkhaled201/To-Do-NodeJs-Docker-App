# One stage build and run
FROM node:20-alpine
WORKDIR /app
COPY ./code/package*.json .
RUN npm ci
COPY --chown=node:node ./code .
USER node
# security instruction in the Dockerfile that tells Docker 
# "From this point, run commands and start the application as the node user instead of root."
EXPOSE 3000
CMD ["node", "server.js"]