# multi-stage: build then run with nginx

# First Stage: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY ./code/package*.json .
RUN npm ci 
# install all dependencies listed in package-lock.json, including the exact versions needed by your application.
COPY ./code/ .
RUN npm run build
# Build the frontend main components (index.html assets/ css/ js/ )and output the static files to the 'dist' directory.

# Second Stage: runtime with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx
RUN chown nginx:nginx /var/cache/nginx
RUN chown nginx:nginx /run
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
# Start Nginx and keep it running in the foreground.