module.exports = {
    ensureAuthenticated: function(req,res,next){
       if(req.isAuthenticated()){
           return next();
       } 
       req.flash('error_msg', 'Please get Registered to access  this page');
       res.redirect('/users/login')
    },
    ensureGuest: function(req,res,next){
        if(req.isAuthenticated()){
    //        req.flash('errorr_msg','you cant go to home page again cos you are signed in')
           res.redirect('/stories/dashboard')
          
        } else{
            return next();
        }
       
     }
}    