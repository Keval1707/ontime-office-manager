# Use official Node.js LTS Alpine base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps


# Copy all source code
COPY . .

# Build the production-ready static files
RUN npm run build

# Install 'serve' globally to serve static files
RUN npm install -g serve

# App will run on this port inside the container
EXPOSE 9200

# Start the server with SPA fallback
CMD ["serve", "-s", "dist", "-l", "9200", "--single"]
