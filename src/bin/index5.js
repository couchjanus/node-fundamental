import express from 'express';
const morgan = require('morgan');
import dotenv from 'dotenv';
const path = require('path');
const favicon = require('serve-favicon');

// const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import * as errorHandler from '../middlewares/errorHandler';

import routes from '../routes';
import logger from '../utils';

const mongoose = require('../database/con');

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
  
  // load the cookie-parsing middleware
  app.use(cookieParser());

  const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
  const DB_NAME = process.env.DB_NAME || 'coolsite';
  const SESSION_SECRET = process.env.SESSION_SECRET || 'secret_key';
  const SESSION_KEY = process.env.SESSION_KEY || 'cid';

  // Session
  app.use(session({
      secret: SESSION_SECRET,
      key: SESSION_KEY,
      cookie: {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
      },
      resave: true,
      
      saveUninitialized: true,
      store: new MongoStore({ 
        url: DB_CONNECTION + '/' + DB_NAME,
        // url : 'mongodb://janusnic:ghbdtn@proximus.modulusmongo.net:27017/jomype3R',
        // url: 'mongodb://janusnic:ghbdtn1@ds163610.mlab.com:63610/janusnic',
        autoReconnect: true,
        // Session expiration
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        // autoRemove: 'native', // Default
        autoRemove: 'interval',
        autoRemoveInterval: 10, // In minutes. Default
        clear_interval: 3600
      })
  }));

    // Logger
  if (app.get('env') === 'development') {
    app.use(morgan('combined', { stream: logger.stream }));
  }
  
  // Public directory
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')))

    // Routing
  app.use('/', routes);

  app.use(errorHandler.bodyParser);
  // Error Middlewares
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.methodNotAllowed);

  return app;
};
