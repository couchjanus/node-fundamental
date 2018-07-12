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
router.get('/posts/:page', controllers.posts_controller.list);


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

router.get('/gallery', controllers.gallery_controller.index);

router.get('/gallery/create', controllers.gallery_controller.create_get);

router.post('/gallery/create',  controllers.gallery_controller.create_post);

// router.get('/gallery/:id', controllers.images_controller.detail);
// router.get('/gallery/:id/delete', controllers.images_controller.delete_get);
// router.post('/gallery/:id/delete', controllers.images_controller.delete_post);
// router.get('/gallery/:id/update', controllers.images_controller.update_get);
// router.post('/gallery/:id/update', gallery.single('urlfile'), controllers.controller.image_update_post);

module.exports = router;
