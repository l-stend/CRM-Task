# official Node.js image
FROM node:lts-alpine as build-stage
# set working directory of the container
WORKDIR /app
# copy and install dependencies into working dir
COPY package*.json ./
RUN npm install
# copy the rest of the files into the container and build
COPY . .
RUN npm run build

# statrt production stage
FROM nginx:stable-alpine as production-stage

# copy dist folder content into nginx server default dir
COPY --from=build-stage /app/dist /usr/share/nginx/html

#expose on prt
EXPOSE 80

# serve app
CMD ["nginx", "-g", "daemon off;"]


# deploy locally (Docker Desktop needed)

# build image
# docker build -t crm-task-img .

# run container
# docker run -d -p 8080:80 --name crm-task-container crm-task-img