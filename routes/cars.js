var express = require('express');
var router = express.Router();
var json = require('../public/json/cars.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cars', { title: 'Express', cars: json.cars });
});

router.get('/brands/:idbrand/models/', function(req, res, next) {
  try {
    let reqid = req.params.idbrand
    res.json(json.cars[reqid]);
    
  } catch (error) {
    res.json({"erreur" : error});

  }
})

router.get('/brands/:idbrand/models/get/:idmodel', function(req, res, next) {
  let reqidbrand = req.params.idbrand;
  let reqidmodel = req.params.idmodel;

    
  if(reqidbrand <= 0 || reqidmodel <= 0) {
    res.json({"message": "Les identifiants ne peuvent pas être traités..."})
    
  }
  
  if(reqidbrand > 0 && reqidmodel > 0) {

    try {
      res.json(json.cars[reqidbrand].modeles[reqidmodel]);
      
    } catch (error) {
      res.json({
        "message": "Une erreur s'est produite",
        "erreur" : error
      });
      
    }

  }


})

module.exports = router;
