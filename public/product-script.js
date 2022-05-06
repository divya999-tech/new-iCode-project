const { response } = require("express");

window.onload=function(){
    let username=document.getElementById("useremail");
    if(email){
        const data={
            email: email.value,
        }
        let options = {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: data
          };
         
   const response= fetch('/login', options)
   const response1=fetch('/products', options)
   if(response.status==200){
    window.location.href="/products"
   }
   if(response1.status==200){
       username.textContent=`Welcome ${email} `

   }
}
}



