module.exports = {
    ensureAuthenticated: function(req,res,next){
       if(req.isAuthenticated()){
           return next();
       } 
       req.flash('error_msg', 'baba go register');
       res.redirect('/users/login')
    }
}