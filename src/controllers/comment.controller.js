const models = require("../entities");
const Pusher = require('pusher');

let pusher = new Pusher({
  appId: "559496",
  key: "90a8eb8b3e01f2774be9",
  secret: "66005b69949bbc7afccd",
  cluster: 'eu',
  encrypted: true
});

// appId: '559496',
// key: '90a8eb8b3e01f2774be9',
// secret: '66005b69949bbc7afccd',
// cluster: 'eu',
// encrypted: true

exports.comment_post = (req, res, next) => {
    let comment = new models.Comment(
      {
          author:{
              id: req.user._id,
              username: req.user.profile.firstName,
          },
          post: {
              id: req.body.post_id
          },
          content: req.body.comment
      });

      if (errors) {
        console.log('ERRORS: '+errors);
        }
      else {
        comment.save(function (err) {
            if (err) { return next(err); }
            console.log(comment);
            });
      }

    let newComment = {
      name: req.user.profile.firstName,
      email: req.user.email,
      comment: req.body.comment,
      _csrf: req.body._csrf

    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({  created: true });
};
