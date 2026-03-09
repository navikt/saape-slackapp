FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim as deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim as runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

RUN apk add --no-cache curl

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "app.js"]
