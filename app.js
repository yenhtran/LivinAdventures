var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Adventure = require('./models/adventure'),
    seedDB = require('./seeds');
    
seedDB();    
mongoose.connect('mongodb://localhost/livin_adventures');
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
    Adventure.find({}, function(err, alladventures) {
        if(err){
            console.log(err);
        } else {
            res.render('adventures/index', {adventures: alladventures})
        }
    });
});

app.post('/adventures', function(req, res){
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        newAdventure = {name: name, image: image, description: description};

    Adventure.create(newAdventure, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/adventures');
        }
    });
});

app.get('/adventures/new', function(req, res) {
    res.render('adventures/new.ejs');
});

//SHOW - shows more info about specific adventure
app.get('/adventures/:id', function(req, res) {
    //find adventure with ID
    Adventure.findById(req.params.id).populate('comments').exec(function(err, foundAdventure){
       if(err){
           console.log(err);
       } else {
           console.log(foundAdventure);
           res.render('adventures/show', {adventure: foundAdventure});
       }
    });
});

//================
// COMMENTS ROUTES
//================

app.get('/adventures/:id/comments/new', function(req, res) {
    //find adventure by id
    Adventure.findById(req.params.id, function(err, adventure){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new',{adventure: adventure});
        }
    })
})
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LivinAdventures Has Started!');
});