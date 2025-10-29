# Dockerfile Integrado - Frontend + Backend
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat

# ========================================
# Build Backend
# ========================================
FROM base AS backend-deps
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM base AS backend-builder
WORKDIR /app/backend
COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY backend/ .
RUN npx prisma generate
RUN npm run build

# ========================================
# Build Frontend  
# ========================================
FROM base AS frontend-deps
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --legacy-peer-deps

FROM base AS frontend-builder
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY frontend/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ========================================
# Production
# ========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser

# Backend
COPY --from=backend-builder --chown=appuser:appuser /app/backend/dist ./dist
COPY --from=backend-builder --chown=appuser:appuser /app/backend/node_modules ./node_modules
COPY --from=backend-builder --chown=appuser:appuser /app/backend/prisma ./prisma
COPY --from=backend-builder --chown=appuser:appuser /app/backend/package.json ./

# Frontend (dentro de /app/frontend para o NestJS servir)
COPY --from=frontend-builder --chown=appuser:appuser /app/frontend/.next/standalone ./frontend
COPY --from=frontend-builder --chown=appuser:appuser /app/frontend/.next/static ./frontend/.next/static
COPY --from=frontend-builder --chown=appuser:appuser /app/frontend/public ./frontend/public

USER appuser

EXPOSE 3000

CMD ["node", "dist/main"]
