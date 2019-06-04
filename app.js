const express = require('express');
const path = require('path')
const mongoose = require("mongoose");
const exphbs = require('express-handlebars')
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const {ensureAuthenticated,ensureGuest} = require('./helpers/auth')

 
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
//load model 
require('./models/story')
require('./models/User')
require('./models/admin')
//load route
const ideas = require('./routes/ideas');
const users = require('./routes/user');
const stories = require('./routes/stories');
const admin = require('./routes/admin');
//passport config
require('./config/passport')(passport);
require('./config/adminpassport')(passport);
//db config
const db = require('./config/database')
//hbs helpers
const {
    truncate,stripTags,select
}=require("./helpers/hbs")
//map global promise - get rid of warning
mongoose.promise=global.promise;


//connect to mongoose
mongoose.connect(db.mongoURL,
{ useNewUrlParser: true})
.then(()=> console.log('mongodb connected'))
.catch((err) => console.log(err));

  



//handle bars middlewares
app.engine('handlebars',exphbs({
    helpers:{
        truncate:truncate,
        stripTags:stripTags,
        select:select
    },
    defaultLayout:'main'
}));
app.set('view engine','handlebars');


//body parser middle ware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//static folder
app.use(express.static(path.join(__dirname,'public')));

//method override middle ware
app.use(methodOverride('_method'))

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
    //cookies:{secure:true}
}));

//passport  middle ware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global variable
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
//INDEX ROUTE
app.get('/',(req,res,next) => {
    const title = 'just getting started';

    res.render('index',{
        title : title
      })
});

// about route
app.get('/ABOUT',(req,res,next) => {
    res.render('stories/about')
});

// route for available hostel
app.get('/available',ensureAuthenticated,(req,res,next) => {
    res.render('admin/available')
});

// route for booked hostel
app.get('/booked',ensureAuthenticated,(req,res,next) => {
    res.render('admin/booked')
});

//log out user
app.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('success_msg','you have succefully logged out');
    res.redirect('/')
})

app.use('/ideas',ideas);
app.use('/stories',stories);
app.use('/users',users);
app.use('/admin',admin);
const port =process.env.PORT || 3000;

app.listen(3000,(req,res,next) => {
    console.log(`server running at port ${port}`)
});