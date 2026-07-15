# ---- Builder Stage ----
FROM node:18-slim AS builder

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

# Copy from backend subfolder
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/prisma ./prisma
COPY backend/src ./src
COPY backend/tsconfig.json ./

RUN npx prisma generate
RUN npm run build

# ---- Runtime Stage ----
FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY backend/package.json backend/package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
