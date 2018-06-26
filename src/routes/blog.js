const router = require('express').Router();


router.get('/', function(req, res) {
    res.json('This is not implemented now');
});

router.post('/post', function(req, res) {
    res.json('This is not implemented now');
});
   
router.get('/post/:id', function(req, res) {
    res.json('This is not implemented now');
  });

router.put('/post/:id', function (req, res){
    res.json('This is not implemented now');
});

router.delete('/post/:id', function (req, res){
    res.json('This is not implemented now');
});

module.exports = router;

