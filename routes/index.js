var express = require('express');
var router = express.Router();
var json = require('../public/json/users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/list', function(req, res, next) {
  try {
    res.json(json);
  } catch (error) {
    res.json({"erreur" : error});
  }
})

module.exports = router;
