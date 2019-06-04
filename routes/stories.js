const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth')
let Story=mongoose.model('stories')

router.get('/',(req,res)=>{
    Story.find({status:'public'})
    //to have access tom the user schema
    .populate('user')
    .then((stories)=>{
        res.render("stories/index",
       { stories:stories})
    })

})
//get ur story
router.get('/show/:id',ensureAuthenticated,(req,res)=>{
Story.findOne({
    _id:req.params.id
})
.populate('user')
.then(story=>{
    res.render('stories/show',
    {story:story})
})
})
router.post('/',(req,res)=>{
    console.log(req.body)
   
let allowComments;
if(req.body.allowComments){  
allowComments=true;
}else{allowComments=false}
const newStory={ 
    title:req.body.title,
    body:req.body.body,
    status:req.body.status,
    allowComments:allowComments,
    user:req.user.id
}
//save
new Story(newStory).save()
.then((story)=>{
res.redirect(`/stories/show/${story.id}`)
})
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    Story.find({user:req.user.id})
    .then(stories=>{
            res.render("stories/dashboard",
            {stories:stories})
        } )
  
    })
   //add stories 
router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render("stories/add")
    })
    
router.get('/edit/:id',ensureAuthenticated,( req,res)=>{
    Story.findOne({
        _id:req.params.id
    })
    
    .then(story=>{
        res.render('stories/edit',
        {story:story})
    })
      
    })
    
router.put('/:id',(req,res)=>{
    res.send("stories/index")
    })
module.exports =router