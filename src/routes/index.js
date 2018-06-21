const router = require('express').Router();

router.use('/', require('./web'));
router.use('/pages', require('./pages'));
router.use('/blog', require('./blog'));
router.use('/admin', require('./admin'));

module.exports = router;
