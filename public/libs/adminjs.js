function check(obj){
  if("sqc" in obj){
    return obj.sqc.id
  }
  else{
    return "Info not Available"
  }
}

function updt(id,name){
    var instance = M.Modal.getInstance($("#modal"));
     instance.open()
     $("#title").text("Update "+name)
     $("#updateUser").click(()=>{ 
     $.post("/updateUser",{
         _id:id,
         username:$("#upname").val(),
         phone:$("#upphone").val(),
         email:$("#upemail").val()
     },data=>{
         if(data=="updated"){
            notie.alert({position:"bottom",time:3,type:"success",text:"user updated"})
             window.location.href="/admin"
         }
     })
    })
  
  }
  
  function del(id){
    $("#"+id).hide()
    $.post("/deleteUser",{id:id},data=>{
        if(data=="deleted"){
            notie.alert({position:"bottom",time:3,type:"success",text:"user deleted"})
        }
    })
  }
$(()=>{
  var search,limit,page
  
$("#valcrit").keydown((e)=>{
  search=e.target.value
  d(search,limit,page)
})
 
$("#select").change(e=>{
limit=e.target.value
d(search,limit,page)
})

$("#ul").on("click","a",(e)=>{
  //e.target.parentElement.setAttribute("class","waves-effect active")
  page=e.target.innerText
  d(search,limit,page)
})

    $('.modal').modal();
    $('select').formSelect();
     setTimeout(()=>{
         $("#prog").hide()
     },3000)  
  function d(search="",limit=5,page=1){
     $.post("/fetchall",{search,limit,page},(data)=>{
       $("#appendable").html("")
       totalDocs=data.totalDocs
       currentPage=data.page
       totalPages=data.totalPages
       data=data.docs
       string=`You are viewing page ${currentPage} of Pages ${totalPages} from total ${totalDocs} Records`
       $("#info").text(string)
         for(i=0;i<data.length;i++){
             $("#appendable").append(`
             <tr id=${data[i]._id}>
                <td>${i+1}</td>
                 <td>${data[i]._id}</td>
                 <td>${data[i].username}</td>
                 <td>${data[i].email}</td>
                 <td>${data[i].phone}</td>
<td>${data[i].gender=="male"?"<i class='material-icons'>accessibility</i>":"<i class='material-icons'>face</i>"}</td>
                 <td><img class="circle" style="width:10%;height:10%;" src="${data[i].pic}"></td>
                 <td>${check(data[i])}</td>
                 <td><a onclick="del('${data[i]._id}')" class="waves-effect waves-light btn"><i class="material-icons left">delete</i></a>
                    <a onclick="updt('${data[i]._id}','${data[i].username}')" class="waves-effect waves-light btn"><i class="material-icons left">update</i></a>
                    <td>
             </tr>
             `)
         }
     })
    }
    d()
    })