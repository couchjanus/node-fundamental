const router = require('express').Router();
import acl from '../middlewares/acl';

router.use('/', require('./web'));
// router.use('/pages', require('./pages'));
router.use('/blog', require('./blog'));
router.use('/admin', [acl.check], require('./admin'));
// router.use('/admin', require('./admin'));
router.use('/auth', require('./auth'));
router.use('/contact', require('./contact'));
module.exports = router;
