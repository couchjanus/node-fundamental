const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
import config from '../config';

// Подключимся к серверу MongoDB

mongoose.connect(config.mongo.connection + '/' + config.mongo.dbase)
  .then(() => {
    console.info("Succesfully connected to MongoDB Database");
  })
  .catch((err) => {
    throw new Error(`Error ${err}: unable to connect to database: ${config.mongo.dbase}`);
  });

module.exports = mongoose;
