module.exports={
    configure:function(otp,eid,name){
        mo={}
        mo.from="uselessuser4@gmail.com"
        mo.to=eid
        mo.subject=`SquareOne OTP | ${otp}`
        mo.text=`
        Dear ${name},
        Your OTP for changing Password is ${otp}
        Kindly you have a minute to enter otp
    
        From
        SquarePay Team
    
        Regards
        `
        return mo
    },
     signUp:function(eid,name,date){
        mo={}
        mo.from="uselessuser4@gmail.com"
        mo.to=eid
        mo.subject=`Congratulations on joining SqDb`
        mo.text=`
        Dear ${name},

        On ${date} , You joined our SquareOne portal,
        We assure you to have best experience from our food portal
        Explore various options from our different varities of menu !!
        
        Regards 
        SquarePay Team
     
        `
        return mo
    },
    recharge:function(eid,name,date,payid,oid,amount,balance,card){
        mo={}
        mo.from="uselessuser4@gmail.com"
        mo.to=eid
        mo.subject=`Recharge of ₹ ${amount}`
        mo.text=`
        Dear ${name},

        On ${date} from your account ${eid}, 
        You Initiated a Recharge of ₹ ${amount} on ${card} 
        and your old balance was ${balance}.

        Kindly keep these details safe:
        orderId:${oid}
        paymentId:${payid}
        
        Regards 
        SquarePay Team
     
        `
        return mo
    },
    orderAccept:function(oid,date,amount,email,name){
        mo={}
        mo.from="uselessuser4@gmail.com"
        mo.to=email
        mo.subject=`Order No ${oid} Accepted`
        mo.text=`
        Dear ${name},

        On ${date} You placed orderNo ${oid} for amount ${amount},
        hence your order is accepted,kindly show the receipt at counter
        to take your order

        Regards
        SquarePay Team
        `
        return mo
    },
    refund:function(email,oid,amount){
        mo={}
        mo.from="uselessuser4@gmail.com"
        mo.to=email
        mo.subject=`Refund Initiated for order ${oid}`
        mo.text=`
        Dear ${oid},

        For order id ${oid} refund of amount Rs ${amount} has been initiated

        Regards
        SquarePay Team
        `
        return mo
    }
}

