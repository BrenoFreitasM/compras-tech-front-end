# Estágio 1: Instalação e Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: Imagem final super leve para Produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Copia apenas os arquivos estritamente necessários gerados pelo "standalone"
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Inicia o servidor Node otimizado do Next.js
CMD ["node", "server.js"]