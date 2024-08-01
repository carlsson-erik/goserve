FROM node:18.19.1 AS frontend_build
WORKDIR /
COPY /frontend .
RUN npm install --force
RUN npm run build


FROM golang:latest AS backend_build
WORKDIR /
COPY /backend .
RUN go mod download
RUN go build


FROM nginx:latest
COPY --from=frontend_build /dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=backend_build goserve goserve
COPY --from=backend_build /db/migrations /db/migrations

COPY start.sh start.sh

# RUN apk add libc6-compat

CMD ["./start.sh"]

