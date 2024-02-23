# Use an official Node runtime as a base image
FROM node:20.9.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]



# For Running this Application Run This command 
# docker build -t your-image-name .
# docker run -p 3000:3000 your-image-name
