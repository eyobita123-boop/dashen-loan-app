# ---- Builder Stage ----
FROM node:18-alpine AS builder

# Install OpenSSL 1.1 compatibility (required by Prisma)
RUN apk add --no-cache openssl1.1-compat libc6-compat

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Generate Prisma Client for Alpine (musl)
RUN npx prisma generate

RUN npm run build

# ---- Runtime Stage ----
FROM node:18-alpine

# Install OpenSSL 1.1 again (runtime dependency)
RUN apk add --no-cache openssl1.1-compat libc6-compat

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
