const models = require("../../entities");

module.exports = {

index: (req, res, next) => {
    models.Category.find().sort([['name', 'ascending']])
   .exec((err, categories) => {
     if (err) { return next(err); }
     res.render('admin/categories/index', { title: 'Category List', categories:  categories});
 });
},

create_get: (req, res, next) => {
    res.render('admin/categories/form', { title: 'Create Category', breadcrumb: 'Add New Category'});
},

  
create_post: (req, res, next) => {

    req.checkBody('name', 'Category name required').notEmpty();
    req.sanitize('name').escape();
    req.sanitize('name').trim();
           
    var errors = req.validationErrors();

    var category = new models.Category(
      { name: req.body.name }
    );

    if (errors) {
        res.render('admin/categories/form', { title: 'Category Create', breadcrumb: 'Add New Category', category: category, errors: errors});
    return;
    }
    else {
        models.Category.findOne({ 'name': req.body.name })
            .exec( function(err, found_category) {
                 console.log('found_category: '+found_category);
                 if (err) { return next(err); }
                 if (found_category) {
                     res.redirect(found_category.url);
                 }
                 else {
                     category.save(function (err) {
                       if (err) { return next(err); }

                       res.redirect('/admin/categories');
                     });
                 }
             });
    }
},

update_get: (req, res, next) => {
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    models.Category.findById(req.params.id, (err, category) => {
        if (err) { return next(err); }

        res.render('admin/categories/form', { title: 'Update Category', breadcrumb: 'Edit Category', category: category });
    });

},


update_post: (req, res, next) => {
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    req.checkBody('name', 'Category name required').notEmpty();
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    var errors = req.validationErrors();
    var category = new models.Category(
      {
      name: req.body.name,
      _id: req.params.id
      }
    );

    if (errors) {
        res.render('admin/categories/form', { title: 'Update Category', breadcrumb: 'Edit Category', category: category, errors: errors});
        return;
    }
    else {

        models.Category.findByIdAndUpdate(req.params.id, category, {},  (err,thecategory) => {
            if (err) { return next(err); }
               res.redirect('/admin/categories');
            });
        }
    },
};
