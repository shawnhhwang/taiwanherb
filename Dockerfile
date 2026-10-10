# ==========================================
# 🌿 台灣本草植物 Wiki (Taiwan Herb Wiki)
# Multi-stage Dockerfile
# ==========================================

# ------------------------------------------
# Stage 1: 前端編譯構建 (Vue 3 + Vite)
# ------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app/client

# 複製前端 package 設定
COPY client/package*.json ./

# 安裝構建依賴
RUN npm ci

# 複製前端源碼並進行 Vite 生產環境編譯
COPY client/ ./
RUN npm run build

# ------------------------------------------
# Stage 2: 生產運行環境 (Node.js + Express)
# ------------------------------------------
FROM node:20-alpine AS runner

LABEL maintainer="Taiwan Herb Wiki Team"
LABEL description="台灣本草植物 Wiki 資料庫系統 - 典藏植物學知識庫與 RAG 諮詢系統"

WORKDIR /app

# 設定環境變數
ENV NODE_ENV=production \
    PORT=3000 \
    DB_FALLBACK_MEMORY=true

# 安裝 curl 供 HEALTHCHECK 檢查使用
RUN apk add --no-cache curl

# 複製後端依賴檔案並安裝生產環境依賴 (排除 devDependencies)
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# 複製後端服務源碼
COPY --chown=node:node server/ ./server/

# 從 Stage 1 複製已編譯完成的前端靜態資源
COPY --chown=node:node --from=builder /app/client/dist ./client/dist

# 切換為安全非 root 使用者 (node)
USER node

# 暴露服務埠號
EXPOSE 3000

# 容器健康狀態檢查機制
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# 啟動服務
CMD ["node", "server/server.js"]
