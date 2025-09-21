# Этап 1: Сборка фронтенд-приложения
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Исправление прав доступа для Vite
RUN chmod +x ./node_modules/.bin/vite

RUN npm run build

# Этап 2: Запуск с Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
