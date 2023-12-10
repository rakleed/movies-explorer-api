# movies-explorer-api

Проект на Express.js с MongoDB, в котором реализован API с регистрацией и авторизацией пользователя, 
получением и обновлением информации о пользователе, поиском фильма и добавления его в избранное.

## Как локально запустить проект

Нужен [Node 20 LTS](https://nodejs.org/en/download/)
и запущенная [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/).

1. Установить зависимости `npm install`
2. В `app.js` раскомментировать строку `'http://localhost:3000'`
   для корректной работы CORS (для деплоя нужно добавить ваш домен)
3. Запустить проект `npm start`

## Планы по доработке проекта

Настроить CI/CD для автоматического деплоя на сервер.
