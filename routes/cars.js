var express = require('express');
var router = express.Router();

const https = require('https');
var json = require('../public/json/cars.json');

/* GET cars listing. */
/* router.get('/', function(req, res, next) {
  res.render('cars', { title: 'Express', cars: json.cars });
}); */


/* router.get('/brands/:idbrand/models/', function(req, res, next) {
  try {
    let reqid = req.params.idbrand
    res.json(json.cars[reqid]);
    
  } catch (error) {
    res.json({"erreur" : error});

  }
}) */

/* router.get('/brands/:idbrand/models/get/:idmodel', function(req, res, next) {
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

}) */


/**
 * Rendu de la page d'accueil.
 * Requête à carqueryapi pour récupérer la liste des constructeurs automobiles.
 * @param  {string} '/' - url
 * @param  {object} req
 * @param  {object} res
 * @returns render('cars') 
 */
router.get('/', function(req, res) {
  https.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=2017', function(result) {
    let data = '';
    
    result.on('data', function(chunk) {
      data += chunk;
    })

    result.on('end', () => {
      let makes = JSON.parse(data).Makes
      res.render('cars', { title: 'Cars', cars: makes });

    })
    
  }).on("error", (err) => {
    console.log("Error: " + err)
  })
  
});

/**
 * Renvoie tout les modèles d'un constructeur automobile.
 * @param  {string} /brands/:idbrand/models/
 * @param  {object} req
 * @param  {object} res
 * @returns json
 */
router.get('/brands/:idbrand/models/', function(req, res) {
  let idBrand = req.params.idbrand
  
  https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${idBrand}`, function(result) {
    let data = '';
    
    result.on('data', function(chunk) {
      data += chunk;
    })

    result.on('end', () => {
      let makes = JSON.parse(data)
      res.json({ makes: makes });

    })
    
  }).on("error", (err) => {
    console.log("Error: " + err)
  })
  
});

/**
 * Renvoie tout les détails d'un modèle en fonction du constructeur et du modèle.
 * @param  {string} /brands/idbrand/models/get/:idmodel
 * @param  {object} req
 * @param  {object} res
 * @returns json
 */
router.get('/brands/:idbrand/models/get/:idmodel', function(req, res) {
  let reqidbrand = req.params.idbrand;
  let reqidmodel = req.params.idmodel;

  https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${reqidbrand}&model=${reqidmodel}`, function(result) {
    let data = '';
    
    result.on('data', function(chunk) {
      data += chunk;
    })

    result.on('end', () => {
      let car = JSON.parse(data)
      res.send({ car });

    })
    
  }).on("error", (err) => {
    console.log("Error: " + err)
  })
    
  /* if(reqidbrand <= 0 || reqidmodel <= 0) {
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

  } */


})


module.exports = router;
