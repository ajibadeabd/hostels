const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {ensureAuthenticated} = require('../helpers/auth')


router.get('/login',(req,res)=>{
res.render('admin/login')
})


router.get('/',ensureAuthenticated,(req,res,next) => {
    idea.find({user:req.user.id})
    .sort({date:'desc'})
    .then((ideas) => {
      res.render('ideas/index',{
          ideas:ideas
    });
});
});


module.exports= router;