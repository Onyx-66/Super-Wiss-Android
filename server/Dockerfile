FROM node:24-bookworm-slim
WORKDIR /app
COPY server ./server
RUN mkdir -p /app/data && chown -R node:node /app
USER node
ENV NODE_ENV=production PORT=3000 DATABASE_PATH=/app/data/accounts.sqlite
EXPOSE 3000
CMD ["node","server/index.mjs"]
