const router = require('express').Router();
const controllers = require('../controllers/admin');

router.get('/', controllers.dashboard_controller.index);

router.get('/categories', controllers.categories_controller.index);

router.get('/category/create', controllers.categories_controller.create_get);
router.post('/category/create', controllers.categories_controller.create_post);

// router.get('/category/:id/delete', controllers.categories_controller.delete_get);
// router.post('/category/:id/delete', controllers.categories_controller.delete_post);

router.get('/category/:id/update', controllers.categories_controller.update_get);
router.post('/category/:id/update', controllers.categories_controller.update_post);

router.get('/posts', controllers.posts_controller.index);
router.get('/post/create', controllers.posts_controller.create_get);
router.post('/post/create', controllers.posts_controller.create_post);

router.get('/post/:id/update', controllers.posts_controller.update_get);
router.post('/post/:id/update', controllers.posts_controller.update_post);

router.get('/users', controllers.users_controller.index);
router.get('/user/create', controllers.users_controller.create_get);
router.post('/user/create', controllers.users_controller.create_post);
router.get('/user/:id/update', controllers.users_controller.update_get);
router.post('/user/:id/update', controllers.users_controller.update_post);
router.get('/user/:id/delete', controllers.users_controller.delete_get);
router.post('/user/:id/delete', controllers.users_controller.delete_post);

module.exports = router;
