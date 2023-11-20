FROM node:20-alpine
WORKDIR ./
COPY . . 
RUN npm i
CMD ["node","index.js"]
EXPOSE 8080
