import express from 'express';
const router = new express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('index', { title: 'Hey Pug', message: 'Hello there Pug!'});
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Pug', message: 'Hello from About Page!',
  tableCapture: 'Table Title'});
});

// define the contact route
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Pug', message: 'Hello from Contact Page!'});
});

module.exports = router;
