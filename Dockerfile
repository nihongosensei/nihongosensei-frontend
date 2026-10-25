# The deps stage uses a glibc image so native modules (e.g. sharp) match the
# distroless runtime.
ARG BUILD_IMAGE=node:24-trixie-slim@sha256:43b9ba1142b8dcf33fa8f922ca1be85714adc444e0586c7cf7726daaeabc1bea
ARG RUNTIME_IMAGE=gcr.io/distroless/nodejs24-debian13:nonroot@sha256:cb606325b7ec4af55462cb0b424a53b452a5b4a894ffe841fcf1048d216fb9f8

FROM ${BUILD_IMAGE} AS deps

WORKDIR /usr/app

ENV NODE_ENV="production"

RUN apt-get update \
    && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts


FROM ${RUNTIME_IMAGE}

WORKDIR /usr/app

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"

# tini reaps zombies and forwards signals, as node is not meant to run as PID 1.
COPY --from=deps /usr/bin/tini /usr/bin/tini
COPY package.json ./
COPY --from=deps /usr/app/node_modules ./node_modules
COPY ./dist .

# nonroot variant: uid/gid 65532
USER 65532:65532

EXPOSE 3000

# Plain TCP check: there is no health route, and "/" may depend on the backend.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD ["/nodejs/bin/node", "-e", "require('net').connect(process.env.PORT,'127.0.0.1').on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))"]

ENTRYPOINT ["/usr/bin/tini", "--", "/nodejs/bin/node"]
CMD ["./server/entry.mjs"]
