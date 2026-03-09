FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "app.js"]
