# Use Node.js 18.17.0 LTS
FROM node:18.17.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY server ./server

# Expose port 8080 (the port your Node.js server will listen on inside the container)
EXPOSE 8080

# Start the Node.js server
CMD ["npm", "start"]
