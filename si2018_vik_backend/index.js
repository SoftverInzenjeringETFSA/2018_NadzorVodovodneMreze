const express = require('express');
const app = express();
const apiRoutes = require('./api/pipes');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./api/routes');
const addVodostaji = require('./api/vodostaji');
const Login = require('./api/login');


mongoose.connect('mongodb+srv://si2018user:si2018pass@cluster0-aqpgk.mongodb.net/test?retryWrites=true')
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/api', addVodostaji);
app.use('/api', Login);

app.use('/', apiRoutes);

routes.registerRoutes(app);
//error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.get("/", function(req, res) {
    res.send("API endpoint works.");
});
console.log("Listening on port 8080");
app.listen(process.env.PORT || 8080);

