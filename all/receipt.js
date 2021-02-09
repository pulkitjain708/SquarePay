
module.exports=function(){
       return function config(cart2,orderid,date,balance,amount){
           var carts=cart2
          var str=`
                            original
                          SQUARE ONE
                Bill No:${orderid}   Bill Dt:${date}
                __________________________________
                Particulars   Qty Rate      Amount
                `
     var str2="";
          for(i in carts){
                str2+=`\t\t${carts[i].name}    ${carts[i].qty}    ${carts[i].price}    ${carts[i].total}\n`
          }
       var str3= `
                __________________________________
                              To Pay : ${amount}
                __________________________________
                Balance : ${balance}         Online
                Wait for Confirmation of Order,
                An Email would be sent on acceptance 
      
                `

                var str4=str+"\n"+str2+"\n"+str3
                return str4
           
       }
    }

