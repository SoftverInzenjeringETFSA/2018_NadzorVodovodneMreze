const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Vodostaj = require('../models/water_level');

// Retrieve and return all water_levels from the database.
router.get('/vodostaji', function(req,res,next){
    Vodostaj.find().then(function(vodostaji){
        res.send(vodostaji);
    });
});

//Create water_level
router.post('/vodostaji', function(req,res,next){
    console.log( " OOVVVVVOOOOOOOOOOO ");
    const {name,value,created_by,lat,lng,pipe} = req.body;
    Vodostaj.create({
        name:name,
        value:value,
        created_by:created_by,
        lat:lat,
        lng:lng,
        pipe:pipe
    }).then(function(vodostaji){
        res.send("Uspjesno dodan vodostaj");
        console.log(vodostaji);
    }).catch(function(error){
        console.log(error);
    });   
    
});

// Find a single water_level with an id
router.get('/vodostaji/:id', function(req,res,next){
    Vodostaj.findById({_id: req.params.id}).then(function(water_level){
        if(!water_level) {
            return res.status(404).send({
                message: "Vodostaj sa tim id-em" + req.params.id + " nije pronadjen"
            });            
        }
        res.send(water_level);
    });
    });

    // Delete a water_level with the specified id in the request
    router.delete('/vodostaji/:id', function(req,res,next){
        Vodostaj.findByIdAndRemove(req.params.id).then(function(err,water_level){
            if(err) return res.send(err);
            res.send({message: 'Deleted'});
        })
    });

    // Update a water_level identified by the id in the request
    router.put('/vodostaji/:id', function(req,res,next) {
  
      // Find water_level and update it with the request body
      Vodostaj.findByIdAndUpdate(req.params.id, {
          value: req.body.value,
          created_by: req.body.created_by,
          deleted: req.body.deleted,
          lat: req.body.lat,
          lng: req.body.lng
      }, {new: true})
      .then(vodostaj => {
          if(!vodostaj) {
              return res.status(404).send({
                  message: "Vodostaj sa id-em " + req.params.articleId + " nije pronadjen"
              });
          }
          res.send(vodostaj);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                message: "Vodostaj sa id-em " + req.params.articleId + " nije pronadjen"
            });                
          }
          return res.status(500).send({
            message: "Greska pri update-u vodostaja sa  " + req.params.articleId + "  id-em"
        });
      });
    });
    
  
module.exports = router;