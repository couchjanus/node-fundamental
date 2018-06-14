const router = require('express').Router();

router.use('/', require('./web'));
router.use('/pages', require('./pages'));
router.use('/blog', require('./blog'));

module.exports = router;
