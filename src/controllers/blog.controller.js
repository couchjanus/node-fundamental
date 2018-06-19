const models = require('../models');

module.exports = {

  index: (req, res) => {
    models.Post.all((err, docs) => {
        res.render('blog/index', { 
            title: 'Post List',
            posts: docs 
        });
    });
    // res.render('blog/index', { title: 'Blog List', data: '' });
  },

  show: (req, res) => {

    models.Post.detail(req.params.id, (err, docs) => {
        res.render('blog/show', { 
            title: 'Post Detail',
            post: docs 
        });
    });
    // res.render('blog/show', { title: 'Show Blog', data: '' });
  },
  
}