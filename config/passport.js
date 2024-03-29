const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
 //load user model 
 const User = mongoose.model('users');
 module.exports = function(passport){
     passport.use(new LocalStrategy({
         usernameField:'email'},
         (email,password,done) => {
            User.findOne({
                email:email
            }).then(user=> {
                if(!user){
                    return done(null,false,{message:'no user found'});
                }
                bcrypt.compare(password,user.password,(err,isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);

                    }else{
                        return done(null,false,{message:'incorrect password'});
                    }
                })
            })
         }));
         passport.serializeUser((user,done) => {
             done(null,user.id);
         });
         passport.deserializeUser((id,done) => {
             User.findById(id,(err,user) => {
                 done(err,user);
             })
         });
 }