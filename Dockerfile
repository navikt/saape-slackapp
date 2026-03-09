FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-dev AS builder
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
