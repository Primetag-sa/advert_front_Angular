FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

# Add app
COPY . /app

# Start app
CMD ng serve --host 0.0.0.0
