import express from 'express';
const router = new express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('pages/home/index', { title: 'Hey Pug Layout', message: 'Hello there Pug Layout!'});
});

router.get('/about', (req, res) => {
  res.render('pages/about/index', { title: 'About Pug', message: 'Hello from About Page!',
  tableCapture: 'Table Title'});
});


// define the contact route
router.get('/contact', (req, res) => {
  res.render('pages/contact/index', { title: 'Contact Pug', message: 'Hello from Contact Page!'});
});

module.exports = router;
