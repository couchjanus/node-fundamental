const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.blog_controller.index);

router.get('/list', controllers.blog_controller.list);

module.exports = router;
