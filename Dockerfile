FROM node:24-alpine

WORKDIR /usr/app

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node ./dist .

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"

RUN npm ci --omit=dev

USER node

EXPOSE 3000

CMD ["node", "./server/entry.mjs"]
