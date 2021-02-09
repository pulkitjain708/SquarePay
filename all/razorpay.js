const razorpay=require('razorpay')

var rp=new razorpay({
    key_id:require("./opts").razorpay_key_id,
    key_secret:require("./opts").razorpay_secret_key
})

module.exports=rp