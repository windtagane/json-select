var express = require('express');
var router = express.Router();
var json = require('../public/json/users.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express', users: json.users });
});

router.get('/get/:id', function(req, res, next) {
  try {
    let reqid = req.params.id
    res.json(json.users[reqid]);
    
  } catch (error) {
    res.json({"erreur" : error});

  }
})

module.exports = router;
