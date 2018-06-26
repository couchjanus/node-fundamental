const models = require("../../entities");

const async = require('async');

// middleware to hanlde errors 
const awaitErorrHandlerFactory = middleware => {
    return async (req, res, next) => {
      try {
        await middleware(req, res, next);
      } catch (err) {
        next(err);
      }
    };
};

module.exports = {

// index: (req, res, next) => {
//     models.Post.find().sort([['title', 'ascending']])
//    .exec((err, posts) => {
//      if (err) { return next(err); }
//      res.render('admin/posts/index', { title: 'Post List', posts:  posts});
//  });
// },


index: awaitErorrHandlerFactory(async (req, res, next) => {
    const posts = await models.Post.find();
    res.render('admin/posts/index', { 
        title: 'Post List', 
        posts:  posts, 
        error: false
    });
}),

// post_detail: async (req, res, next) => {
//     const instance = await models.Post.findOne({
//       where: { _id: req.params.id }
//     });
//     if (instance) {
//         res.render('admin/posts/detail', {
//             title: 'Post Detail',
//             post:  instance,
//             breadcrumb: 'Post Detail'
//         });
//     } else {
//       res.status(404).json({error: "Not found"});
//     }
// },

// post_detail: async (req, res, next) => {
//     try {
//       const instance = await models.Post.findOne({
//         where: { _id: req.params.id }
//       });
//       res.render('admin/posts/detail', {
//         title: 'Post Detail',
//         post:  instance,
//         breadcrumb: 'Post Detail'
//         });
//     } catch (err) {
//         return next(err);
//     }
// },

// post_detail: (req, res, next) => {
//     async.parallel({
//       post: (callback) => {
//         models.Post.findById(req.params.id)
//         .populate('category')
//         .exec(callback);
//       },
//     },
//       (err, results) => {
//         if (err) {
//             return next(err);
//         }
//         res.render('admin/posts/detail',
//             {
//               title: 'Post Detail',
//               post:  results.post,
//               breadcrumb: 'Post Detail'
//             });
//     });
// },

// create_get: (req, res, next) => {

//     async.parallel({
//         categories: (callback) => {
//             models.Category.find(callback);
//             },
//         }, 
//         (err, results) => {
//             if (err) {
//                 return next(err);
//             }
//             // console.log(results.categories);
//             res.render('admin/posts/form',
//             {
//                 title: 'Create New Post',
//                 categories:results.categories,
//                 // csrf: req.csrfToken(),
//                 breadcrumb: 'Create New Post'
//             });
//         }
//     );
// },

create_get: awaitErorrHandlerFactory(async (req, res, next) => {
    const categories = await models.Category.find();
    res.render('admin/posts/form', {
            title: 'Create New Post',
            categories:categories,
            breadcrumb: 'Create New Post'
    });
}),


create_post: async (req, res, next) => {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Content must not be empty').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('category').escape();

    const instance = await models.Post.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(",")
    });
    res.redirect('/admin/posts');
},

// create_post: function(req, res, next) {
//     req.checkBody('title', 'Title must not be empty.').notEmpty();
//     req.checkBody('content', 'Content must not be empty').notEmpty();
//     req.sanitize('title').escape();
//     req.sanitize('content').escape();
//     req.sanitize('title').trim();
//     req.sanitize('content').trim();
//     req.sanitize('category').escape();

//     let post = new models.Post(
//       { title: req.body.title,
//         content: req.body.content,
//         status: req.body.status,
//         category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(",")
//        });

//     console.log('post: '+post);

    // var errors = req.validationErrors();
    // if (errors) {
    //     console.log('category: '+req.body.category);

    //     console.log('ERRORS: '+errors);

//         async.parallel({
//             categories: function(callback) {
//                 models.Category.find(callback);
//             },
//         }, function(err, results) {
//             if (err) { return next(err); }

//             for (i = 0; i < results.categories.length; i++) {
//                 if (post.category.indexOf(results.categories[i]._id) > -1) {
//                     results.categories[i].checked='true';
//                 }
//             }

//             res.render('admin/posts/form', { title: 'Create Post', categories:results.categories, post: post, errors: errors });
//         });

//     }
//     else {
//         post.save(function (err) {
//             if (err) { return next(err); }
//                res.redirect('/admin/posts');
//             });
//     }

// },

delete_get: function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/posts/delete', { title: 'Delete post', post: results.post } );
    });

},

delete_post: function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id).populate('category').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }

            models.Post.findByIdAndRemove(req.body.id, function deletePost(err) {
                if (err) { return next(err); }
                res.redirect('/admin/posts');
            });
    });

},

update_get: async (req, res, next) => {
    const instance = await models.Post.findById(req.params.id).populate('category');
    const categories = await models.Category.find();
    if (instance) {
        res.render('admin/posts/form', {
            title: 'Update post', 
            categories:categories,
            post: instance 
        });
    } else {
        res.status(404).json({error: "Not found"});
    }
},

// update_get: function(req, res, next) {

//     req.sanitize('id').escape();
//     req.sanitize('id').trim();

//     async.parallel({
//         post: function(callback) {
//             models.Post.findById(req.params.id).populate('category').exec(callback);
//         },
//         categories: function(callback) {
//             models.Category.find(callback);
//         },
//         }, function(err, results) {
//             if (err) { return next(err); }

//             for (var all_g_iter = 0; all_g_iter < results.categories.length; all_g_iter++) {
//                 for (var post_g_iter = 0; post_g_iter < results.post.category.length; post_g_iter++) {
//                     if (results.categories[all_g_iter]._id.toString()==results.post.category[post_g_iter]._id.toString()) {
//                         results.categories[all_g_iter].checked='true';
//                     }
//                 }
//             }
//             console.log("results.post ", results.post);
//             res.render('admin/posts/form', {
//               title: 'Update post', categories:results.categories,
//               csrf: req.csrfToken(),
//               post: results.post });
//         });

// },


update_post: async (req, res, next) => {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('content', 'Summary must not be empty').notEmpty();
    req.sanitize('title').escape();
    req.sanitize('content').escape();
    req.sanitize('title').trim();
    req.sanitize('content').trim();
    req.sanitize('status').escape();
    req.sanitize('category').escape();

    const updated = await models.Post.findByIdAndUpdate(req.params.id,
        { 
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(","),
            _id:req.params.id
       });
    res.redirect('/admin/posts');
    
},


// update_post: function(req, res, next) {

//     req.sanitize('id').escape();
//     req.sanitize('id').trim();

//     req.checkBody('title', 'Title must not be empty.').notEmpty();
//     req.checkBody('content', 'Summary must not be empty').notEmpty();

//     req.sanitize('title').escape();
//     // req.sanitize('content').escape();
//     req.sanitize('title').trim();
//     // req.sanitize('content').trim();
//     req.sanitize('status').escape();
//     req.sanitize('category').escape();

//     var post = new models.Post(
//       { title: req.body.title,
//         content: req.body.content,
//         status: req.body.status,
//         category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(","),
//         _id:req.params.id
//        });



//     var errors = req.validationErrors();
//     if (errors) {
//         async.parallel({
//             categories: function(callback) {
//                 models.Category.find(callback);
//             },
//         }, function(err, results) {
//             if (err) { return next(err); }

//             for (i = 0; i < results.categories.length; i++) {
//                 if (post.category.indexOf(results.categories[i]._id) > -1) {
//                     results.categories[i].checked='true';
//                 }
//             }
//             res.render('admin/posts/form', { title: 'Update post',categories:results.categories, post: post, errors: errors });
//         });

//     }
//     else {
//         models.Post.findByIdAndUpdate(req.params.id, post, {}, function (err,thepost) {
//             if (err) { return next(err); }
//                res.redirect(thepost.url);
//             });
//     }

// },
// 
};
