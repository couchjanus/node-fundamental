const models = require('../entities');

exports.images_index = (req, res, next) => {
  models.Picture.find()
    .sort([['title', 'ascending']])
    .exec((err, imagesList) => {
      if (err) {
        return next(err);
      }
      res.render('gallery/index', {
        title: 'Images List',
        images: imagesList,
      });
    });
};

exports.detail = (req, res, next) => {
        models.Picture.findById(req.params.id)
          .sort([['title', 'ascending']])
          .exec(function (err, image_item) {
            if (err) { return next(err); }
            res.render('gallery/detail', { title: 'Title', image:  image_item });
        });
  };
   