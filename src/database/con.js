const mongoose = require('mongoose');

// указать mongoose правильные промисы.

// Заменим библиотеку Обещаний (Promise), которая идет в поставку с mongoose (mpromise)
// На Bluebird

mongoose.Promise = require('bluebird');

import dotenv from 'dotenv';
dotenv.config();

// адрес MongoDB сервера будет загружаться с конфигов
const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'coolsite';

// Подключимся к серверу MongoDB

mongoose.connect(DB_CONNECTION + '/' + DB_NAME)
  .then(() => {
    // Данная функция будет вызвано когда подключение будет установлено
    console.info("Succesfully connected to MongoDB Database");
  })
  // В случае ошибки будет вызвано данная функция
  .catch((err) => {
    console.error("Database Connection Error: " + err);
    // Скажите админу пусть включит MongoDB сервер :)
    console.error('Админ сервер MongoDB Запусти!');
    process.exit(2);
  });

module.exports = mongoose;

