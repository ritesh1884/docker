# FROM node:23-alpine  # Base image. alphine is an image which is light weight.

# WORKDIR /app  # docker container ke andar kaun se directory me rakhna chahte ho code ko
# COPY package.json /app    # COPY package.json .
# COPY package-lock.json /app

# RUN npm install  # install the the dependency in docker container

# #copying the rest of the files like index.js
# COPY . .   # First dot is representing all the files(index.js) and 2nd dot image is representing /app

# CMD ["npm", "start"]  # to start the application



FROM node:23-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# u can also provide range: 3000-3005
EXPOSE 8000 3000 3001   

CMD ["npm", "start"]