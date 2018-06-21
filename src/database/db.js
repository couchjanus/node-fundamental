const mongoose = require('mongoose');

import dotenv from 'dotenv';

dotenv.config();

// mongoose.Promise = global.Promise;

const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';

const DB_NAME = process.env.DB_NAME || 'coolsite';

mongoose.connect(DB_CONNECTION + '/' + DB_NAME, 
    (err) => {
 
      if (err) throw err;
    
      console.log('Successfully connected');
 
});


// mongoose.connect(
//   DB_CONNECTION + '/' + DB_NAME)
//   .then(() => console.log('Mongooses connection succesful!'))
//   .catch((err) => console.error(err));

module.exports = mongoose;
