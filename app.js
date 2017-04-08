var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');

var adventures = [
            {name: 'Surfing', image: 'https://source.unsplash.com/L5aI2jU0i50/400X300'},
            {name: 'Snowboarding', image: 'https://source.unsplash.com/pOwhy6PDorE/400X300'},
            {name: 'Rock Climbing', image: 'https://source.unsplash.com/uJfwRhfgSnw/400X300'},
            {name: 'Hiking', image: 'https://source.unsplash.com/rHv6C-WTOls/400X300'}
        ]
    
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
        res.render('adventures', {adventures: adventures});
});

app.post('/adventures', function(req, res){
    var name = req.body.name,
        image = req.body.image,
        newAdventure = {name: name, image: image};
        
    adventures.push(newAdventure);
    res.redirect('/adventures');
});

app.get('/adventures/new', function(req, res) {
    res.render('new.ejs');
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('AdventureCamp Has Started!');
});