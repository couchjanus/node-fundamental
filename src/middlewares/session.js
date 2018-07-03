const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import config from '../config';

export default session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: {
      "path": "/",
      "httpOnly": true,
      "maxAge": null
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: config.mongo.connection + '/' + config.mongo.dbase,
      autoReconnect: true,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
      autoRemove: 'interval',
      autoRemoveInterval: 10, // In minutes. Default
      clear_interval: 3600
    })
});

