const session=require('express-session')

module.exports=session({
    secret:'lol',
    resave:false,
    saveUninitialized:true
})