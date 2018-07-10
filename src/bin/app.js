'use strict';

const join = require('path').join;
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import express from 'express';
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

const csrf = require('csurf');

const passport = require('passport');

const app = express();

require('../database/db');

// const passport = require('passport');

import * as errorHandler from '../middlewares/errorHandler';
import routes from '../routes';
import session from '../middlewares/session';
import logger from '../utils';

// Page Rendering
app.set('views', join(__dirname, '../views'));
app.set('view engine', 'pug');

// load the cookie-parsing middleware
app.use(cookieParser());

// Session
app.use(session);

// Passport configuration
require('../middlewares/authentication')(passport); // pass passport for configuration
// Монтируем Passport:
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Logger
if (app.get('env') === 'development') {
    app.use(morgan('combined', { stream: logger.stream }));
}

// Public directory
app.use(express.static(join(__dirname, '../../public')));
app.use(favicon(join(__dirname, '../../public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());


app.use(csrf());
app.use(function(req, res, next){
 res.locals.csrftoken = req.csrfToken();
 next();
});


// Routing
app.use('/', routes);

// Error Middlewares
// app.use(errorHandler.bodyParser);
// app.use(errorHandler.genericErrorHandler);
// app.use(errorHandler.methodNotAllowed);
process.on('warning', (warning) => {
    console.log(warning.stack);
});
export default app;
