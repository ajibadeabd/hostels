const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport= require('passport');

//load user model
require('../models/User')
User = mongoose.model('users')

//post login form
router.post('/login', (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
 });
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect:'/ideas/register',
//       failureRedirect: '/users/login',
//       failureFlash: true
//     })(req, res, next);
//   });

//get login form
router.get('/login', (req,res) => {
    res.render('users/login')
});
//register form
router.get('/register', (req,res) => {
    res.render('users/register')
})

//register form post
router.post('/register', (req,res) => {
    let errors = []
    
    if(req.body.password != req.body.confirmpassword){
        errors.push({text:'password dont match'})
    }
    if(req.body.password.length< 4){
        errors.push({text:'password must be atleast 4 character'})
    }
    if(errors.length > 0){
        res.render('users/register',{
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        });
    }
    else{
        User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                req.flash('error_msg', 'Email already regsitered');

                res.redirect('/users/register')
            }else{
                const   newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                });
                          
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if(err) throw err;
                      newUser.password = hash;
                      newUser.save()
                        .then(user => {
                          req.flash('success_msg', 'You are now registered and can log in');
                          res.redirect('/users/login');
                        })
                        .catch(err => {
                          console.log(err);
                          return;
                        });
                    });
                  });
                
            }

            
        })

     }
    
});

//log out user
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','you have succefully log out');
    res.redirect('/users/login')
})
module.exports = router;