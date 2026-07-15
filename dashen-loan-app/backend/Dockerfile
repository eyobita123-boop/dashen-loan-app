# ---- Builder Stage ----
FROM node:18-slim AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate
RUN npm run build

# ---- Runtime Stage ----
FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
