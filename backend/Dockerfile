# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 10000

# Start application
CMD ["node", "dist/main"]
