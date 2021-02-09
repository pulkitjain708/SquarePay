
// answers query sendquery

object={
    "who are you":"I am Bot @ squareone",
    "recharge card":"1)Go to payments tab \n 2)Fill Amount \n 3)Choose an Method \n 4)Proceed to Verify",
    "card":"1)Go to payments tab \n2)Click on get Card \n3) Card would be issued \n4)Login and Logout to Recharge",
    "":"Ask further questions by integrating ':' infront of your query,Reply would be from administrator",
}

$("#sendquery").click(()=>{
    query=$("#query").val()
    valIndex=""
    if(query.includes(":")){
        query=query.split(":")[1]
        $.post("/sendFAQ",{uid:$("#userID").val(),question:query},(data)=>{ 
           if(data)     
            M.toast({html:"response maybe emitted soon..."})
        })
        return 
    }
   var arr=Object.keys(object)
   for(i=0;i<arr.length;i++){
       if(query.includes(arr[i])){
           valIndex=arr[i]
           $("#answers").append(`<p>${query} : ${object[valIndex]}</p>`)
           break;
       }
   }
})