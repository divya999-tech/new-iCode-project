
window.onload=function(){
    let formContact=document.getElementById("myform");
    let yourName=document.getElementById("name");
    let yourEmail=document.getElementById("mail");
    let phoneNumber=document.getElementById("phone");
    let message=document.getElementById("message");
    let errorMessage=document.getElementById("error")
    let successMessage=document.getElementById("success")
    
    formContact.addEventListener("submit", async (event)=>{
        event.preventDefault();
        if(yourName.value=== ""  || yourEmail.value=== "" || phoneNumber.value=== "" || message.value=== ""){
           // window.alert("Please fill all the fields")
           errorMessage.textContent="Please fill all the fields";
    errorMessage.style.color="red";
            
        }else if(yourName.value.length>30) {
            //window.alert("PLease check the length of the characters")
            errorMessage.textContent="Please check the length of the characters";
    errorMessage.style.color="red";
    
          }else if(phoneNumber.value.length!==10){
            //window.alert("Please check length of the mobile number")
            errorMessage.textContent="Please check the length of the mobile number";
    errorMessage.style.color="red";
            
    
    
          }else if(isNaN(phoneNumber.value) ){
           // window.alert("please check the number. It should be only number")
           errorMessage.textContent="Please check the number. It should be only number";
    errorMessage.style.color="red";
    
          }else if(message.value.length>200){
              //window.alert("Please check the maximum length of characters")
              errorMessage.textContent="Please check the maximum length of characters";
    errorMessage.style.color="red";

          }
        else{
           //window.alert(`Your Name: ${yourName.value} \n Your Email: ${yourEmail.value} \n Your Phone NUmber: ${phoneNumber.value} \n Your Message: ${message.value}`);
           const data2={
            yourName: yourName.value,
            yourEmail:yourEmail.value,
            phoneNumber:phoneNumber.value,
            message:message.value
               
           };
          
           let options={
             method:'POST',
            headers: { "Content-type": "application/json; charset=UTF-8"  },
             body:JSON.stringify(data2)
           };
        
        const response = await  fetch('/contact', options);
        console.log(response)
            const id= await  response.json();
           console.log(id);
           if(response.status==200){
            successMessage.textContent="Thank you for your feedback";
            successMessage.style.color="green"
           }else{
            console.log("error")
           }
        //console.log(response)
          
          //console.log(json);
          /*if(response.status==200){
            const json= await  response.json();
           
           let result =document.getElementById("result");
           result.innerHTML=`User:Name: ${yourName.value} with id: ${json} \n Email: ${yourEmail.value} with id: ${json}  \n Mobile: ${phoneNumber.value} with id: ${json} \n Message: ${message.value} with id: ${json}`
          }else{
            result.innerHTML="There is an error. Please check."
          }*/
          }

        
    });

    };

   

    