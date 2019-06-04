const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {ensureAuthenticated} = require('../helpers/auth')



//edit ideas form
router.get('/edit/:id',ensureAuthenticated,(req,res) => {
    idea.findOne({
        _id: req.params.id
 
    }).then((idea) => {
       if(idea.user!=req.user.id){
           req.flash('error_msg','dont tamper with another persons ideas')
           res.redirect('/ideas')
       }else{
        res.render('ideas/edit',{
            idea : idea
      });
       }
    
 });
 });
 
 
 //add ideas form
 router.get('/add',ensureAuthenticated,(req,res,next) => {
     res.render('ideas/add')
 });
 
 
 router.post('/',ensureAuthenticated,(req,res,next) => {
     let errors=[];
 
 if(!req.body.title){
     errors.push({text:'please add a title'})
 }
 if(!req.body.details){
     errors.push({text:`please add some detail`})
 }
     if(errors.length > 0){
     res.render('ideas/add',{
         errors: errors,
         title:req.body.title,
         details :req.body.details,
         
     });
 }else{
     const newUser = {
         title:req.body.title,
         details:req.body.details,
         user:req.user.id
     }
 new idea(newUser)
 .save()
 .then((idea) => {
     req.flash('success_msg','video idea added')
     res.redirect('/ideas')
 })
 }   
 })
 
 
 // update ideas
 router.put('/:id',ensureAuthenticated, (req,res) => {
   idea.findOne({
       _id:req.params.id
   })
   .then(idea => {
       idea.title = req.body.title;
       idea.details = req.body.details;
 
       idea.save()
        .then(idea => {
         req.flash('success_msg','video idea updated')
           res.redirect('/ideas');
     })
   })
 })
 
 
 
 //delete idea
 router.delete('/:id',ensureAuthenticated,(req,res) => {
     
     idea.remove({
         _id:req.params.id
     }).then(() => {
         req.flash('success_msg','video idea removed')
         res.redirect('/ideas');
     })
 })
 //ABOUT PAGE
 
 
 //ideas page
 router.get('/',ensureAuthenticated,(req,res,next) => {
     idea.find({user:req.user.id})
     .sort({date:'desc'})
     .then((ideas) => {
       res.render('ideas/index',{
           ideas:ideas
     });
 });
 });
 



module.exports = router;