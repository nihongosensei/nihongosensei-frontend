ARG NODE_IMAGE=node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53

FROM ${NODE_IMAGE} AS deps

WORKDIR /usr/app

ENV NODE_ENV="production"

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts


FROM ${NODE_IMAGE}

# tini reaps zombies and forwards signals, as node is not meant to run as PID 1.
# npm, npx, corepack and yarn are not needed at runtime.
RUN apk add --no-cache tini \
    && rm -rf /usr/local/lib/node_modules /opt/yarn* \
        /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
        /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /usr/app

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"

COPY package.json ./
COPY --from=deps /usr/app/node_modules ./node_modules
COPY ./dist .

USER 1000:1000

EXPOSE 3000

# Plain TCP check: there is no health route, and "/" may depend on the backend.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD ["node", "-e", "require('net').connect(process.env.PORT,'127.0.0.1').on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))"]

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./server/entry.mjs"]
