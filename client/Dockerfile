# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages 
RUN npm install --force

# Copy the rest of the application code
COPY . .

# # Build the app
# RUN npm run build

# Make the app accessible on port 3000
EXPOSE 3000

#Define the command to run the app
CMD ["npm", "start"]