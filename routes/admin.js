const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const passport= require('passport')
const {ensureAuthenticated} = require('../helpers/auth')

require("../models/admin")
Admin=mongoose.model('adminn')
router.get('/login',(req,res)=>{
res.render('admin/login')
})


router.post('/login',(req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req,res,next);
//     let errors=[]
//     if(req.body.accessCode.length<8){
// errors.push({text:'access denied'})
//     }
//     if(req.body.password!=req.body.confirmpassword){
//       errors.push({text:'incorrect password'})
//     }
//     if(errors.length>0){
//         res.render('admin/login',
//            {
//                errors:errors,
//                code:req.body.accessCode,
//                password:req.body.password
//            } 
//             )

//     }
//     else{

//     const  onlyadmin= new Admin({
//         code:req.body.accessCode,
//         password:req.body.password,
//     })
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(onlyadmin.password, salt, (err, hash) => {
//           if(err) throw err;
//           onlyadmin.password = hash;
//           onlyadmin.save()
//             .then(user => {
//               req.flash('success_msg', 'admin');
//               res.redirect('admin/dashboard');
//             })
//             .catch(err => {
//                 req.flash('error_msg', 'You are not an admin');
//                    res.redirect('/admin/login');
//             });
//         });
//       });   
      
   
// }

});


module.exports= router;