# syntax=docker/dockerfile:1

FROM node:latest


# Устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходный код проекта в контейнер
COPY . .

RUN npx prisma generate

# Запускаем ваше приложение при старте контейнера
CMD ["npm", "run", "dev"]
