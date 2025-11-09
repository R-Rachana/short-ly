#Stage 1: Build the TypeScript code
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#Satge 2: Create the final, small production image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install *only* production dependencies 
RUN npm install --omit=dev
#Copy the build code from the 'builder' stage
COPY --from=builder /app/dist ./dist

#Expose the port the app runs on
EXPOSE 3001

#The command to run the app
CMD ["node", "dist/index.js"]