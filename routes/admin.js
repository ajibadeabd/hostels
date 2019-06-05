const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const {ensureAuthenticated} = require('../helpers/auth')
//load model
require("../models/admin")
let Admin=mongoose.model('adminn')


require("../models/availablehostel")
let Available=mongoose.model('availablehostels')


router.get('/login',(req,res)=>{
res.render('admin/login')
})


router.post('/login',(req,res,next) => {
//    et errors=[]
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

//     } l
      let code= req.body.accessCode;
     
      let   password=req.body.password;
          Admin.findOne({
          code:code ,
          password:password 
          })
    // const  onlyadmin= new Admin({
    //     code:req.body.accessCode,
    //     password:req.body.password,
    // })
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(onlyadmin.password, salt, (err, hash) => {
    //       if(err) throw err;
    //       onlyadmin.password = hash;

    //       onlyadmin.save()
            .then(user => {
              req.flash('success_msg', 'admin');
              res.redirect('/admin/dashboard');
            })
            .catch(err => {
                req.flash('error_msg', 'You are not an admin');
                   res.redirect('/admin/login');
            });
    //     });
    //   });   
      });
     // get admin dashboard
router.get("/dashboard",(req,res)=>{
  res.render('admin/dashboard')
})


// get details of all  hostels
router.get("/availablehostel",(req,res)=>{

  Available.find({
    _id:req.params.id
  })
  .then(available=>{
    res.render('admin/availablehostel',{
      available:available
    });
  });
});











//get booked hostel

router.get("/booked",(req,res)=>{
  res.render('admin/booked')
})


// get add hostel route
router.get("/addhostel",(req,res)=>{
  res.render('admin/addhostel')
})

//post added hostel
router.post("/addhostel",(req,res)=>{
       
 
   const newhostel=  new Available({
      block:req.body.block,
      flat:req.body.flat,
      room1:req.body.room1,
      room2:req.body.room2
  }); 
  console.log(newhostel)
    newhostel.save()
    .then(hostel=>{
      req.flash('success_msg', 'added');
      res.redirect('/admin/availablehostel')
    })
    .catch(err=>{
      req.flash('error_msg', 'not saved');
      console.log(err);

    })


 
})
//get edit routes
router.get(`/:id`,(req,res)=>{

  Available.findOne({
   _id:req.params.id
  })
  .then(one=>{
    res.render('admin/edithostel',{
      one:one
    });
  })
  .catch(err=>{
    req.flash('error_msg','not edited')
    res.render('admin/addhostel')
  })
 
})



module.exports= router;