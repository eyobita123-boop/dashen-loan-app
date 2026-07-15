FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
