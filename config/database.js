if(process.env.NODE_ENV === 'production'){
    module.exports =  {mongoURL:
        'mongodb://<dbuser>:<dbpassword>@ds141454.mlab.com:41454/nameofdatabaseon mlab'
    }
}else{
    module.exports =  {mongoURL:
        'mongodb://localhost/abd'
}
}