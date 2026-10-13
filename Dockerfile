FROM node:22-alpine AS build

RUN npm install --global pnpm@10.34.4

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Browser settings are embedded by Next.js during the build.
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_AUTH_CLIENT_ID=intania-888-web
ARG NEXT_PUBLIC_INTANIA_GAMES_URL=""

ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_AUTH_CLIENT_ID=${NEXT_PUBLIC_AUTH_CLIENT_ID}
ENV NEXT_PUBLIC_INTANIA_GAMES_URL=${NEXT_PUBLIC_INTANIA_GAMES_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN test -n "$NEXT_PUBLIC_API_BASE_URL" && pnpm build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=8080

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node

EXPOSE 8080

CMD ["node", "server.js"]
