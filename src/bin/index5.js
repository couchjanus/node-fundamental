import express from 'express';
const morgan = require('morgan');
import dotenv from 'dotenv';

import routes from '../routes';

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
  // if (app.get('env') === 'development') {
  //   app.use(logger('dev'));
  // }
  
  // You can set morgan to log differently depending on your environment
  if (app.get('env') == 'production') {
    app.use(morgan(
      'common', 
      { 
        skip: function(req, res) { 
                  return res.statusCode < 400 
              }, 
        stream: require('fs').createWriteStream(__dirname + '/../../logs/morgan.log', {flags: 'a'})
      }
    ));
  } else {
    // app.use(morgan('dev'));
    app.use(morgan(
      'common', 
      { 
        stream: require('fs').createWriteStream(__dirname + '/../../logs/morgan.log', {flags: 'a'})
      }
    ));
  }

  app.get('/', (req, res) => {
    res.send('Hello here Express...');
  });
  
  // Routing
  app.use('/', routes);

  return app;
};
