const models = require('../../entities');
const async = require('async');

exports.index = (req, res, next) => {
  models.Picture.find()
    .sort([['name', 'ascending']])
    .exec((err, imagesList) => {
      if (err) {
        return next(err);
      }
      res.render('admin/gallery/index', {
        title: 'Images List',
        breadcrumb: 'Images List',
        images: imagesList,
      });
    });
};

exports.create_get = (req, res) => {
  res.render('admin/gallery/form',
  {
    title: 'Create Image',
    breadcrumb: 'Add New Picture',
    csrf: req.csrfToken()
  });
};

exports.create_post = (req, res, next) => {

    let image = new models.Picture();

    image.name = req.body.name;
    image.path = req.file.filename;
  	image.save(function (err) {
  		if (err) return next(err)
  		res.redirect('/admin/gallery');
  	});

    // models.Picture.find({}, function(err, foundImage) {
  	// 	if (!foundImage.length) {
  	// 		image.name = req.body.name
  	// 		image.path = req.file.filename
  	// 		image.save(function(err) {
  	// 			if (err) {
    //         return next(err);
    //       }
    //       console.log("Save image");
  	// 			res.redirect('/admin/gallery')
  	// 		});
  	// 	} else {
  		// 	fs.unlink(path.join(__dirname, '../public/uploads') + foundImage[0].path, function(err) {
  		// 		models.Picture.remove({}, function(err, removed) {
  		// 			if (err) {
      //         return next(err);
      //       }
  		// 			image.name = req.body.name;
  		// 			image.path = req.file.filename;
  		// 			image.save(function(err) {
  		// 				if (err) return next(err)
  		// 				res.redirect('/admin/gallery');
  		// 			});
  		// 		});
  		// 	});
  		// }
  	// });
  };


exports.detail = (req, res, next) => {
        models.Picture.findById(req.params.id)
          .sort([['title', 'ascending']])
          .exec(function (err, image_item) {
            if (err) { return next(err); }
            res.render('admin/gallery/detail', { title: 'Title', image:  image_item });
        });
  };

  exports.delete_get = (req, res, next) => {
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      },
      (err, results) => {
          if (err) { return next(err); }
          res.render('admin/gallery/delete', { title: 'Delete Image', image: results.image } );
      });
  };

  exports.delete_post = (req, res, next) => {
      req.checkBody('id', 'Image id must exist').notEmpty();
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      }, (err, results) => {
          if (err) { return next(err); }
          else {
              models.Picture.findByIdAndRemove(req.body.id, function deleteImage(err) {
                  if (err) { return next(err); }
                  res.redirect('/admin/gallery');
              });
          }
      });
  };

  exports.update_get = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();
      models.Picture.findById(req.params.id, (err, image) => {
          if (err) { return next(err); }
          res.render('admin/gallery/form', { title: 'Update Image', image: image });
      });
  };


  exports.update_post = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();

      req.checkBody('title', 'Image title required').notEmpty();

      req.sanitize('title').escape();
      req.sanitize('title').trim();

      var errors = req.validationErrors();

      var image = new models.Picture(
        {
        title: req.body.title,
        author: req.body.author,
        url: req.file.filename,
        description: req.body.description,
        _id: req.params.id
        }
      );

      if (errors) {
          res.render('admin/gallery/form', { title: 'Update Image', image: image, errors: errors});
      return;
      }
      else {
          models.Picture.findByIdAndUpdate(req.params.id, image, {},  (err,thecategory) => {
              if (err) { return next(err); }
                 res.redirect(thecategory.link);
              });
      }
  };
