# Use official Node.js runtime as base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies needed for build (e.g., OpenSSL for Prisma)
RUN apk add --no-cache openssl

# Copy package manifests
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies needed for prisma generate)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

# Set Node environment
ENV NODE_ENV=production
ENV PORT=5000

# Create non-root node user for security
USER node

# Copy dependencies and build outputs from base stage
COPY --chown=node:node --from=base /app/node_modules ./node_modules
COPY --chown=node:node --from=base /app/package*.json ./
COPY --chown=node:node --from=base /app/prisma ./prisma
COPY --chown=node:node --from=base /app/src ./src

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "src/server.js"]
