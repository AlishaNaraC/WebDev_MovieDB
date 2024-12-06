# Use Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app code
COPY . .

# Expose the port React development server uses (3000 by default)
EXPOSE 3000

# Command to start the development server
CMD ["npm", "start"]
