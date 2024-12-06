# Use a base Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code to the container
COPY . .

# Expose the backend port (5000)
EXPOSE 5000

# Command to start the backend application
CMD ["npm", "start"]
