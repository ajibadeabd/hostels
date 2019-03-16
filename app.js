const express = require('express');
const path = require('path')

const mongoose = require("mongoose");

const exphbs = require('express-handlebars')

const app = express();

const bodyParser = require('body-parser')

 const passport = require('passport')

 //passportLocal= require('passport-local')

const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/user');


//passport config
require('./config/passport')(passport);
//require('./config/passport')(passport);

mongoose.promise=global.promise;


//connect to mongoose
mongoose.connect('mongodb://localhost/abd',
{ useNewUrlParser: true})
.then(()=> console.log('mongodb connected'))
.catch((err) => console.log(err));





//handle bars middlewares
app.engine('handlebars',exphbs({
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
    res.render('about')
});



app.use('/ideas',ideas);

app.use('/users',users);
const port = 3000;

app.listen(3000,(req,res,next) => {
    console.log(`server running at port ${port}`)
})