const user=require("./models").userM
const order=require("./models").orderM
const mongoose=require("./models").mongoose
const chat=require("./models").chatM
const menum=require("./models").menuM
const rp=require("./razorpay")
const rcp=require("./receipt")

var mobj={}
function loadData(){
a = new Promise((resolve,reject)=>{
    menum.find({type:"fastfood"},(err,fastfood)=>{
        mobj.fastfood=fastfood
        menum.find({type:"snacks"},(err,snacks)=>{
            mobj.snacks=snacks
            menum.find({type:"combos"},(err,combos)=>{mobj.combos=combos
               mobj.combos=combos
               menum.find({type:"drinks"},(err,drinks)=>{mobj.drinks=drinks
                 resolve("done")
                 })
             })
         })
        })
})
return a
}


exports.authenticate=(req,res,next)=>{
    if(req.session.user=="user"){
        next()
    }
    else{
        return res.redirect("/")
    }
}

exports.authenticateAdmin=(req,res,next)=>{
    if(req.session.user=="admin"){
        next()
    }
    else{
        return res.redirect("/")
    }
}

exports.authenticatesqAdmin=(req,res,next)=>{
    if(req.session.user=="sqadmin"){
        next()
    }
    else{
        return res.redirect("/")
    }
}

exports.getRoot=(req,res)=>{
    res.render("homepage")
}

exports.getAdmin=(req,res)=>{
    res.render("admin")
}

exports.getAbout=(req,res)=>{
    res.render("about")
}

exports.getContact=(req,res)=>{
    res.render("contact")
}

exports.getSignIn=(req,res)=>{
    if(req.session.data){
        res.redirect("/dashboard")
    }
    else
    res.render("signIn")
}

exports.getSignUp=(req,res)=>{
    res.render("signUp")
}

exports.postAddUser=(req,res)=>{
    uname=req.body.username
    em=req.body.email
    phone=req.body.phone
    passw=req.body.password
    gndr=req.body.gender
   
    alerts=[]

    if(uname=="")
    alerts.push("Username can't be null")
    if(phone.length!=10)
    alerts.push("Ph No has to be valid")
    if(passw.length<5)
    alerts.push("Password must be more than 5 characters")

    if(alerts.length==0){
        date=new Date()
        today=date.getDate()+"/"+date.getMonth()+"/"+date.getYear()
        mailOpts=require("./mailC").signUp(em,uname,today)
      mail=require("./mailer")()
      mail(mailOpts)
        new user({
            username:uname,
            email:em,
            phone:phone,
            applied:"0",
            sqc:{
                balance:0
            },
            password:passw,
            gender:gndr,
            pic:"/images/avatar/male/1.png"
        }).save()
        .then(()=>{res.send("success")})
        .catch(err=>{
            res.send("error")
        })
    }
    else if(Array.isArray(alerts)){
        res.send(alerts)
    }
}

exports.postCheckSignIn=(req,res)=>{
    email=req.body.email
    password=req.body.password

    if(email=="sqadmin@sq.in" && password=="")
        {   
            req.session.user="sqadmin"
            res.redirect("/sq")
        }    
    if(email=="admin@sq.in" && password=="" )
       {   req.session.user="admin"
           res.redirect("admin")
       }
    user.findOne({email:email,password:password})
    .then(data=>{
        if(data){
            req.session.user="user"
        req.session.data=data
        res.redirect('/dashboard')
        }
    })
}

exports.getDashboard=(req,res)=>{
    razorpay_orders={}
    rp.orders.create({amount:100,currency:"INR",receipt:"1"},(err,order)=>{
    razorpay_orders=order
    })
    loadData().then(data=>{
        res.render("dashboard",{data:req.session.data,
            snacks:mobj.snacks,
            fastfood:mobj.fastfood,
            combos:mobj.combos,
            drinks:mobj.drinks,
            order_id:razorpay_orders.id
          }) 
    })
} 

exports.getSettings=(req,res)=>{
    res.render("settings",{data:req.session.data})
}

exports.updateAvatar=(req,res)=>{
    picture=req.body.pic
    did=req.body.id
    user.findOneAndUpdate({_id:did},{$set:{pic:picture}},status=>{
        res.send("success")
    })
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect("/")
}

exports.passwordUpdate=(req,res)=>{
    pass=req.body.pass
    id=req.body.id
    user.findOneAndUpdate({_id:id},{$set:{password:pass}},(status)=>{
        res.send("updated")
    })
}

exports.getForgotPassword=(req,res)=>{
    res.render("forgotPassword")
}

exports.otp=(req,res)=>{
    otp = Math.floor(1000 + Math.random() * 9000)
    eid=req.body.email
    user.findOne({email:eid})
    .then(data=>{
        if(data){
        object={
            id:data._id,
            otp:otp
        }
    mailOpts=require("./mailC").configure(otp,eid,data.username)
      mail=require("./mailer")()
      mail(mailOpts)
      setTimeout(()=>{
        res.send(object)
      },5000)
    }
    else
    res.send("404")
    })
}

exports.err404=(req,res)=>{
    res.render("404")
}

exports.fetchall=(req,res)=>{
    limit=req.body.limit
    search=req.body.search
    page=req.body.page

if(search){
    var regexp=new RegExp(search,"i")
    searching={$or:[{username:regexp},{email:regexp},{phone:regexp}]}
}
else {
    searching={}
}

options={
    page,
    limit
}
    user.paginate(searching,options,(err,result)=>{
        res.send(result)
    })
}

exports.deleteUser=(req,res)=>{
   user.findOneAndRemove({_id:req.body.id},doc=>{
       res.send("deleted")
   })
 }

 exports.updateUser=(req,res)=>{
     obj={email:req.body.email,phone:req.body.phone,username:req.body.username}
     user.findByIdAndUpdate({_id:req.body._id},{$set:obj},(err,resp)=>{
         res.send("updated")
     })
 }

 exports.getCard=(req,res)=>{
     id=req.body.id
     card= Math.floor(100000 + Math.random() * 900000)
        user.findByIdAndUpdate({_id:id},{$set:{applied:"1","sqc.id":card}},(err,resp)=>{
            req.session.data.applied="1"
            req.session.data.sqc={
                id:card,
                balance:"Null"
            }
            res.send("Your new card is issued with id "+card+",Recharge to order")
        })
    }


exports.getsq=(req,res)=>{
    loadData().then((data)=>{
        res.render("sqpanel",{
            snacks:mobj.snacks,
            fastfood:mobj.fastfood,
            combos:mobj.combos,
            drinks:mobj.drinks,
      })
    })
}

exports.addMenu=(req,res)=>{
    name=req.body.name
    price=req.body.price
    type=req.body.type
    path="/menu/"+type+"/"+name+".jpg"
    new menum({
        item:name,
        price:price,
        imgpath:path,
        type:type,
        isAvail:true
    }).save()
    res.send("save")
}

exports.payment=(req,res)=>{
    rp.payments.capture(req.body.razorpay_payment_id,100)
    user.findOneAndUpdate({_id:req.body.personId},
        {$inc:{'sqc.balance':Number(req.body.amount)}},(err,resp)=>{
         mailOpts=require("./mailC").recharge(
             resp.email,resp.username,new Date().toLocaleString(),req.body.razorpay_payment_id,req.body.orderId,req.body.amount,resp.sqc.balance,resp.sqc.id
         )
         mail=require("./mailer")()
         mail(mailOpts)
        })
        req.session.data.sqc.balance+=Number(req.body.amount)
   res.redirect("/dashboard",)
}

exports.updateAvail=(req,res)=>{
        id=req.body.id
        menum.findOne({_id:id},(err,data)=>{
            if(data.isAvail){
                data.isAvail=false
            }
            else{
                data.isAvail=true
            }
            data.save()
        })
}

exports.sendOrder=(req,res)=>{
    another=[]
    cart=JSON.parse(req.body.cart)
    total=req.body.total
    id=req.body.id
    var date=new Date();
    today=date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    balance=""
    orderId= Math.floor(1000000 + Math.random() * 9000000)
    user.findOne({_id:id},
        (err,data)=>{
          data.sqc.balance-=total
          balance=data.sqc.balance
          data.save()
        }
        ).then(()=>{
            new order({
                user:id,
                total:total,
                cart:cart,
                orderId:orderId,
                approved:false,
                date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            }).save(()=>{
                a=rcp()
                ab=a(cart,orderId,today,balance,total)
                res.send(ab)
            })
        })

}

exports.renderRequests=(req,res)=>{
    res.render("accept")
}

exports.getItems=(req,res)=>{
    d=req.body.d
    order.find({approved:false,date:d})
    .populate("user","email username")
    .exec((err,data)=>{
        res.send(data)
    })
}

exports.updateItem=(req,res)=>{
    id=req.body.id
    name=req.body.name
    mail=req.body.mail
    order.findOneAndUpdate({orderId:id},{$set:{approved:true}},(err,data)=>{
        mailOpts=require("./mailC").orderAccept(id,data.date,data.total,mail,name)
        mail=require("./mailer")()
        mail(mailOpts)
    })
    res.send("OK ")
}

exports.getOrders=(req,res)=>{
    id=req.session.data._id
    order.find({user:id},(err,data)=>{
       res.render("prev_orders",{
           orders_prev:data,
           data:req.session.data
       })
    })
}

exports.reqref=(req,res)=>{
    orderId=req.body.oid
    total=Number(req.body.amt)
    uid=req.body.uid
    email=req.body.email
    order.deleteOne({orderId})
    .then(()=>{
        user.findOneAndUpdate({_id:uid},{$inc:{"sqc.balance":total}})
        .then(()=>{
            mailOpts=require("./mailC").refund(email,orderId,total)
            mail=require("./mailer")()
            mail(mailOpts)
        })
        .then(()=>{
            res.send("OK!")
        })
    })
}

exports.FAQ=(req,res)=>{
    uid=req.body.uid
    question=req.body.question

    new chat({
        user:uid,
        chat:{
            question:question,
            answer:""
        },
        answered:false
    }).save()
    .then(()=>{
        res.send("OK!")
    })
}

exports.getChat=(req,res)=>{
    res.render("chats")
}

exports.postChats=(req,res)=>{
    chat.find({answered:false})
    .populate("user","username pic")
    .exec((err,data)=>{
        res.send(data)
    })
}

exports.submitAnswer=(req,res)=>{
    id=req.body.id
    answer=req.body.answer
    chat.findOneAndUpdate({_id:id},{$set:{answered:true,"chat.answer":answer}})
    .then(()=>{
        res.send("OKK!!")
    })
}

exports.faqs=(req,res)=>{
    id=req.session.data._id
    chat.find({user:id},(err,data)=>{
       res.render("faqs",{
           faqs:data,
           data:req.session.data
       })
    })
}