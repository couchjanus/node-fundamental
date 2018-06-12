import express from 'express';

module.exports = function () {

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello here Express...');
  });

  return app;
};

