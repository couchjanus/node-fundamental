const models = require("../../entities");

const helpers = require("../../helpers");
const async = require('async');

module.exports = {

index: (req, res, next) => {

  models.User.find()
    .sort([['email', 'ascending']])
    .exec((err, users) => {
      if (err) { 
        return next(err); 
        }
      res.render('admin/users/index', 
        { 
          title: 'Users List', 
          users: users, 
          breadcrumb: 'Users List'
        });
  });
},

create_get: function(req, res, next) {
    res.render('admin/users/form', 
    { 
        title: 'Create User', 
        csrf: req.csrfToken(),
    });
},

create_post: function(req, res, next) {
    // req.assert('email', 'Please provide a valid email address.').isEmail();
	// req.assert('password', 'Please enter a password of at least ' + config.login.minimumPasswordLength + ' characters.').len(config.login.minimumPasswordLength);
	// req.assert('confirmPassword', 'Your passwords must match.').equals(req.body.password);

	let errors = req.validationErrors();
    
    let newUser = new models.User();
    // set the user's local credentials
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.profile.firstName = req.body.firstName;
    // newUser.verificationToken = helpers.createRandomToken();
    newUser.isVerified = true;
    
	newUser.save((err) => {
		if (err) {
			console.log(err);
        }
        return res.redirect('/admin/users');
    });
},

delete_get: function(req, res, next) {

   models.User.findById(req.params.id, (err, user) => {
    if (err) { 
        return next(err); 
    }
    res.render('admin/users/delete', 
      { 
          title: 'Delete user', 
          csrf: req.csrfToken(),
          user: user 
      });
   });
},

delete_post: function(req, res, next) {

   models.User.findByIdAndRemove(req.body.id, function deleteUser(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/admin/users');
      });
},

update_get: function(req, res, next) {
    
    models.User.findById(req.params.id, (err, user) => {
        if (err) { 
            return next(err); 
        }
             
        if (user.isVerified==true) {
          user.checked=true;
         }

        res.render('admin/users/form', 
          { 
            title: 'Update User', 
            breadcrumb: 'Edit User', 
            csrf: req.csrfToken(),
            user: user 
          });
    });
},

update_post: (req, res, next) => {
    req.checkBody('email', 'Email must not be empty.').notEmpty();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
   
    let user = new models.User(
      { email: req.body.email,
        roles: [req.body.roles],
        profile:  {
            firstName: req.body.firstName || null
            },
       _id: req.params.id,
       isVerified: (req.body.isVerified==='on')?true:false
       });

    let errors = req.validationErrors();

    if (errors) {
        res.render('admin/users/form', { title: 'Update User', user: user, errors: errors });
        }
    else{
         models.User.findByIdAndUpdate(req.params.id, user, {},  (err) => {
            
            if (err) { 
                return next(err); 
            }
               res.redirect('/admin/users');
            });
        }
    },
};
