const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const Section = require('../models/section');
const Pipe = require('../models/pipe');
const Status = require('../models/pipe_status');
const PipeDetail = require('../models/pipe_details');

//get list of pipes
router.get('/pipes', function(req,res,next){
    Pipe.find().then(function(pipes){
        res.send(pipes);
    });
});

//add pipe to list of pipes
/*
primjer:
{
  "name":"pipe #2",
  "created_by":1,
  "deleted":false,
  "start_lat": 43.840272,
  "start_lng": 18.348954,
  "end_lat": 43.845950,
  "end_lng": 18.347277,
  "pipe_detail":{
  	"pipe_status":{
    	"name":"critical"
     }
   }
}

unos lokacije nije dodan
*/
router.post('/pipes', function(req,res,next){

    if(req.body.hasOwnProperty('pipe_detail')){
        if(req.body.pipe_detail.hasOwnProperty('pipe_status')){
           
            Status.findOne({'name':req.body.pipe_detail.pipe_status.name}, function(err, result) {
                
                if(result){
                    req.body["status"]=req.body.pipe_detail.pipe_status.name;
                    req.body.pipe_detail.pipe_status= result._id;
                    req.body.pipe_detail["pipe_status_id"]=req.body.pipe_detail["pipe_status"];
                    delete req.body.pipe_detail["pipe_status"];

                    PipeDetail.create(req.body.pipe_detail).then(function(new_pipe_detail){
                        req.body.pipe_detail_id = new_pipe_detail._id;
                        delete  req.body["pipe_detail"];
                        
                     console.log(req.body);
                     Pipe.create(req.body).then(function(pipe){
                        res.send(pipe);
                    });
                    })
                }
                else{
                    res.send({"error":"Parametri nisu u dobrom formatu"});
                }    
         
              });
           
        }
    }
   
  
    
});

//delete list of pipes
router.delete('/pipes', function(req,res,next){
//ovo ne radi !!
    Pipe.deleteMany({},function(err,result){
        if(err)
            res.send({"error":err});
    });
});

//replace list of (all) pipes
router.put('/pipes', function(req,res,next){

    
});

//get pipe
router.get('/pipes/:id', function(req,res,next){
Pipe.findById({_id: req.params.id}).then(function(pipe){
    res.send(pipe);
});
});

//delete pipe
router.delete('/pipes/:id', function(req,res,next){

});

//update pipe
router.patch('/pipes/:id', function(req,res,next){
    console.log(req);
    var status1 = null;
    if(req.query.status==="workInProgress")
        status1="good";
    else
        status1="workInProgress"
    Pipe.update({_id: req.params.id},{status:status1}).then(function(pipe){
        res.send(pipe);
    });

});

//pomocne
router.post('/section', function(req,res,next){
Section.create(req.body).then(function(section){
    res.send(section);
});

});
router.get('/section', function(req,res,next){
    Section.find({}).then(function(section){
        res.send(section);
    });
});

router.post('/status', function(req,res,next){
    Status.create(req.body).then(function(status){
        res.send(status);
    });
    
    });
router.get('/status', function(req,res,next){
    Status.find({}).then(function(status){
        res.send(status);
    });
});
router.get('/pipe_details/:_id',function(res,req,next){
    PipeDetail.findById(_id).then(function(detail){
        res.send(detail);
    })  
})

module.exports = router;