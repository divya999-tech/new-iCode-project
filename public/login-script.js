

window.onload = function () {
  let formEle = document.getElementById("myform");
  let email = document.getElementById("username");
  let password = document.getElementById("secret");
  let errorMessage = document.getElementById("error");
  let checkbox = document.getElementById("checkbox");





  console.log(checkbox.checked)



  formEle.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (email.value === "" || password.value === "") {
      //window.alert("Please fill the fields");
      errorMessage.textContent = "Please fill the fields";
      errorMessage.style.color = "red";

    } else if (email.value.length > 30) {
      // window.alert("PLease check the length of the characters")
      errorMessage.textContent = "Please check the length of characters";
      errorMessage.style.color = "red";


    } else if (password.value.length > 30) {
      //window.alert("Please check the length of the password")
      errorMessage.textContent = "Please check the password length. It should not be more than 30 characters";
      errorMessage.style.color = "red";


    }
    else {
      // window.alert(`Hi my name is ${name.value} \n Password: ${password.value}`);
      const data1 = {
        email: email.value,
        password: password.value,

      };

      let options = {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data1)
      };

      const response = await fetch('/login', options);
      //console.log(response)
      const id = await response.json();
      console.log(id);
      if (response.status == 200) {
        //let template=`Welcome ${email}`
        //console.log(template)
        //username.textContent=template
        window.location.href = "/products"


      } else {
        errorMessage.textContent = "Invalid Username/Password or Please register";
        errorMessage.style.color = "red"
      }

      /* if(response.status==200){
         const json= await  response.json();
         
        let result =document.getElementById("result");
        result.innerHTML=`User:Name: ${name.value} with id: ${json} \n Password: ${password.value} with id: ${json}  `
        
       }else{
         result.innerHTML="There is an error. Please check."
       }*/



    }


  });




};