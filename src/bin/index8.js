import express from 'express';
const morgan = require('morgan');
import dotenv from 'dotenv';
const path = require('path');

import routes from '../routes';
import logger from '../utils';

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
 
  // Logger
  if (app.get('env') === 'development') {
    app.use(morgan('combined', { stream: logger.stream }));
  }
  
  // Public directory
  app.use(express.static(path.join(__dirname, '../../public')));

  // Routing
  app.use('/', routes);

  // Error handing
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // add this line to include winston logging
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  return app;
};
