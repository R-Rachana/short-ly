#Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . . 
#this runs he "build" cript from your client's package .json
RUN npm run build

#Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the built files from the 'builder' stage
# The 'npm run build' command creates a 'dist' folder
# We copy its contents into the Nginx public web folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (the default port for Nginx)
EXPOSE 80

# The default command for Nginx is to start the server
CMD ["nginx", "-g", "daemon off;"]