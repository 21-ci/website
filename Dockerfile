# building
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# serve
FROM nginx:1.27-alpine AS runner

LABEL org.opencontainers.image.source="https://github.com/21-ci/website"
LABEL org.opencontainers.image.description="21 Cloud landing page"
LABEL org.opencontainers.image.licenses="21 Cloud"

# SPA fallback
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# Allow nginx user to write pid and cache files
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
