const express=require('express')
const expressLayout=require('express-ejs-layouts')
const app=express()

app.set('view engine','ejs')
app.use(expressLayout)
app.use(express.urlencoded({extended:false}))
app.use(require("./all/session"))
app.use(express.static('public'))
app.use('/',require("./all/routes"))

app.listen(8000,()=>{
    console.log("server serving at localhost:8000")
})