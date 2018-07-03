require('dotenv').config();

const APP_HOST = process.env.APP_HOST || '0.0.0.0';

const NODE_ENV = process.env.NODE_ENV || 'development';

const PORT =
(process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';

// app.locals.title = process.env.APP_NAME;
// app.locals.version = process.env.APP_VERSION;

const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'coolsite';

const SESSION_SECRET = process.env.SESSION_SECRET || 'secret_key';
const SESSION_KEY = process.env.SESSION_KEY || 'cid';


const config = {
  env:  NODE_ENV,
  port: PORT,
  host: APP_HOST,
  // mongooseDebug: envVars.MONGOOSE_DEBUG,
  // jwtSecret: envVars.JWT_SECRET,
  mongo: {
    dbase: DB_NAME,
    connection: DB_CONNECTION,
  },
  session: {
    secret: SESSION_SECRET,
    key: SESSION_KEY
  },
  login: {
    maxAttempts: 3,// process.env.MAX_LOGIN_ATTEMPTS,
    lockoutHours: 60 * 60 * 1000, //process.env.LOGIN_ATTEMPTS_LOCKOUT_HOURS * 60 * 60 * 1000,
    minimumPasswordLength: 6, //process.env.MINIMUM_PASSWORD_LENGTH,
    passwordResetTimeLimitInHours:1, //process.env.PASSWORD_RESET_TIME_LIMIT_IN_HOURS,
    passwordHashRounds:10, //parseInt(process.env.PASSWORD_HASH_ROUNDS, 10)
  },
};

export default config;
