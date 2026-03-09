FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-dev AS builder
WORKDIR /app
COPY . /app
RUN npm ci --omit=dev

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["app.js"]
