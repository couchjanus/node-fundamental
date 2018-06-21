import express from 'express';
const morgan = require('morgan');
import dotenv from 'dotenv';
const path = require('path');
const favicon = require('serve-favicon');

import * as errorHandler from '../middlewares/errorHandler';

import routes from '../routes';
import logger from '../utils';

const db = require('../database/db');

/**
 * Initialize environment variables.
 */
dotenv.config();

const APP_PORT =
(process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';

const APP_HOST = process.env.APP_HOST || '0.0.0.0';

const APP_ENV = process.env.APP_ENV || 'development';

module.exports = function () {

  const app = express();

  app.set('port', APP_PORT);
  app.set('host', APP_HOST);
  app.set('env', APP_ENV);

  app.locals.title = process.env.APP_NAME;
  app.locals.version = process.env.APP_VERSION;

  // Page Rendering
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'pug');

  // Для подключения к серверу mongodb применяется метод connect():
  
  db.connect(`mongodb://localhost:27017`, (err) => {
    if (err) {
      console.log('Unable to connect to MongoDB.');
      process.exit(1);
    } else {
      console.log('Connected to MongoDB Successful!');
    }
  });

  // Logger
  if (app.get('env') === 'development') {
    app.use(morgan('combined', { stream: logger.stream }));
  }
  
  // Public directory
  app.use(express.static(path.join(__dirname, '../../public')));
  
  // app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')))

  
  // Routing
  app.use('/', routes);

  app.use(errorHandler.bodyParser);
  // Error Middlewares
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.methodNotAllowed);

  return app;
};
