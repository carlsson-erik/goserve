FROM node:18.19.1 AS frontend_build
COPY . .
RUN npm install --force
RUN npm run build 

FROM nginx:latest
COPY --from=frontend_build /dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# RUN apk add libc6-compat
CMD ["nginx","-g","daemon off;"]

