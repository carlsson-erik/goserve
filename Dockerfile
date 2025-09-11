
FROM golang:latest AS backend_build
WORKDIR /
COPY /backend .
RUN go mod download
RUN go build


COPY --from=backend_build goserve goserve
COPY --from=backend_build /db/migrations /db/migrations

COPY start.sh start.sh

# RUN apk add libc6-compat

CMD ["./start.sh"]

