FROM node:20-alpine AS build-stage
ENV VITE_BMON_BACKEND_URL "/api"
WORKDIR /app
COPY package.json .
RUN yarn install --immutable
COPY . .
RUN npm run build

FROM busybox:1.35
ARG PORT=$PORT
EXPOSE $PORT

RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "$PORT"]