const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');
let url = 'mongodb://localhost:27017/coolsite'; 

describe("Use connect method to connect to the Server", function() {
    it("Тестируем соединение с MongoDB", function() {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            db.close();
          });
    });
});

