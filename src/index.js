import app from './bin';
import config from './config';

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, (err) => {
    if (err) {
      return console.error('Something bad happened', err);
    }
    console.info(`Server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
