FROM node:22-alpine

WORKDIR /usr/app

COPY --chown=node:node public ./public
COPY --chown=node:node package.json ./package.json

COPY --chown=node:node build/standalone ./
COPY --chown=node:node build/static ./build/static

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

USER node

CMD ["node", "server.js"]
