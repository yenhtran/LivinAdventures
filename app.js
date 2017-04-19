var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Adventure = require('./models/adventure'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');
    
//requiring routes
var commentRoutes = require('./routes/comments'),
    adventureRoutes = require('./routes/adventures'),
    indexRoutes = require('./routes/index');
    
    
mongoose.connect('mongodb://localhost/livin_adventures');
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//methodOverride is used for edit adventures
app.use(methodOverride('_method'));
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'The mountains are calling!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to make available the current user in the navbar. 
//Called on every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use('/', indexRoutes);
app.use('/adventures/:id/comments', commentRoutes);
app.use('/adventures', adventureRoutes);
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LivinAdventures Has Started!');
});