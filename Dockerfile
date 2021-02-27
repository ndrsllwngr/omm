FROM node:lts

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Copy source files
COPY . ./

# Building app
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
