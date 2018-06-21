const mongoose = require('mongoose'),
      assert = require('assert');
      
console.log(mongoose.version);
// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/test')
//     .then(() => console.log('Mongooses connection succesful!'))
//     .catch((err) => console.error(err));


 
mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
     
    if (err) throw err;
     
    console.log('Successfully connected');
     
});
      