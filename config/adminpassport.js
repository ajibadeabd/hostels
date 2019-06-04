const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
 //load user model 
 const Admin = mongoose.model('adminn');
 module.exports = function(adminpassport){
    adminpassport.use(new LocalStrategy({
         usernameField:'code'},
         (code,password,done) => {
            Admin.findOne({
                code:code
            }).then(user=> {
                if(!user){
                    return done(null,false,{message:'incorrect code'});
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
         adminpassport.serializeUser((user,done) => {
             done(null,user.id);
         });
         adminpassport.deserializeUser((id,done) => {
             Admin.findById(id,(err,user) => {
                 done(err,user);
             })
         });
 }