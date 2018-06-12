// 
import express from 'express';
const router = new express.Router();
const path = require('path');

// router.get('/', (req, res) => {
//   res.send('Hello here Express...');
// });

router.get('/about', (req, res) => {
  res.send('Now, I’ve noticed a tendency for this programme to get rather silly');
});

// define the blog page route
router.get('/blog', (req, res) => {
  res.send('Janus blog page');
});
// define the contact route
router.get('/contact', (req, res) => {
  res.send('About page');
});


// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../../public/index.html'));
// });

// router.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../../public/about.html'));
// });

// // define the blog page route
// router.get('/blog', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../../public/blog.html'));
  
// });
// // define the contact route
// router.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../../public/contact.html'));
// });

module.exports = router;