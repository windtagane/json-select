var express = require('express');
var router = express.Router();
var json = require('../public/json/users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(typeof json.users);
  res.render('index', { title: 'Express', users: json.users });
});

router.get('/users/get/:id', function(req, res, next) {
  try {
    let reqid = req.params.id
    res.json(json.users[reqid]);
    
  } catch (error) {
    res.json({"erreur" : error});

  }
})

module.exports = router;
