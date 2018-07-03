const router = require('express').Router();

router.use('/', require('./web'));
// router.use('/pages', require('./pages'));
// router.use('/blog', require('./blog'));
router.use('/admin', require('./admin'));
// router.use('/auth', require('./auth'));

module.exports = router;
