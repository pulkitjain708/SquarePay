const mongoose=require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
mongoose.connect("mongodb://localhost:27017/sop",{useNewUrlParser:true})

const user= new mongoose.Schema({
    username : String,
    password : String,
    email : {
        type:String,
        unique:true
    },
    phone : String,
    gender: String,
    pic:String,
    applied:String,
    sqc:{
        id:Number,
        balance:Number
    }
})

const menu = new mongoose.Schema({
    item:String,
    isAvail:Boolean,
    price:Number,
    imgpath:String,
    type:String
})

const orders= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId , ref:"user",
        required:true
    },
    date:String,
    orderId:Number,
    cart:[],
    approved:Boolean,
    total:Number
})

const question=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"user",
        required:true
    },
    chat:{
        question:String,
        answer:String
    },
    answered:Boolean
})

user.plugin(mongoosePaginate)

let userM=mongoose.model('user',user)
let menuM=mongoose.model('menu',menu)
let orderM=mongoose.model('order',orders)
let chatM=mongoose.model('chat',question)

module.exports={
    mongoose,
    userM,
    menuM,
    orderM,
    chatM
}