# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# To ensure both tsconfig.json AND tsconfig.build.json are copied
COPY tsconfig.build.json ./
COPY tsconfig.json ./

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build

# Bundle app source
COPY . .

#Exposing the port 3000
EXPOSE 3000

# Start the server using the production build
CMD ["npm","run","start"]