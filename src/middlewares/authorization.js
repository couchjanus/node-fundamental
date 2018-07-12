var acl = require('acl');
var mongoose = require('mongoose');
var config = require('./config');

acl = new acl(new acl.mongodbBackend(mongoose.connection.db, config.db.aclCollectionPrefix), { debug: function(string) { console.log(string); } });

module.exports = {
	init: function() {
		acl.addRoleParents('superAdmin', 'admin');
		acl.addRoleParents('admin', 'user');

		acl.allow([
			{
				roles: ['admin'],
				allows: [
					{
						resources: '/user/list',
						permissions: 'get'
					}
				]
			},
			{
				roles: ['superAdmin'],
				allows: [
					{
						resources: '/admin/list',
						permissions: 'get'
					}
				]
			}
		]);
	},

	getAcl: function() {
		return acl;
	}
};



const aclify = require('aclify');

const mongoose = require('mongoose');
const config = require('../config');

const acl = new aclify.Acl(new aclify.MongoDBStore(mongoose.connection.db, config.db.aclCollectionPrefix));

module.exports = {

	init: function() {
    
      // acl.isAllowed('admin', 'admin', '*', function(err, res){
      //   if(res){
      //       console.log("User admin is allowed to view admin")
      //       }
      
    set_roles();

    function set_roles () {
      acl.allow(
        [{
            roles: 'admin',
            allows: [{
                      resources: '/admin',
                      permissions: '*'
                    }
                ]
          }, 
          {
             roles: 'user',
             allows: [{
             resources: 'blog',
             permissions: ['view', 'edit', 'delete']
            }]
          }, 
          {
            roles: 'guest',
            allows: []
           }
        ]);

    // acl.addUserRoles('5a02f8724a1d8a2056e61f47', 'admin').then(function (res){
    //     console.log('Added myself ' + res);
    // }).catch(function (err){
    //     console.log('Didnt worked m8' + err);
    // });

  		// acl.addRoleParents('admin', 'user');
		// acl.addRoleParents('user', 'guest');
	}
	},

	getAcl: function() {
		return acl;
	}
};
