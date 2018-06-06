const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/user');


router.post('/login', function(req,res,next){
    console.log("Prošao AJAX zahtjev za login");
    var korisnik = req.body.korisnik;
    var sifra = req.body.sifra;
    User.findOne({'username':korisnik, 'password':sifra}).then(function(err, user){
        //user i nvm su default podaci ako je baza prazna
        if(user || (korisnik=='user' && sifra=='nvm')) {
            console.log("Korisnik pronađen");
            return res.status(200).send("OK");            
        }
        else return res.status(404).send({
            message: "Uneseni su neispravni podaci"
        }); 
    });
});

module.exports = router;