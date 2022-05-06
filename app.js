//Importing  express module
//////////**********************Importing Libraries***************///////////////////
const express=require("express");
const port=process.env.PORT || 5000;
const urlencodedParser = express.urlencoded({ extended: true });
const path= require("path")
const stripe = require('stripe')('sk_test_51Jehn0Dig9etiS64SrG01N1BPgBn6wlyNHF7e70RBRDk1yzZBICi0K4p7kxE2jzSH9zqcTLn7lzxVGPa39Uijq2r00KXCXjERn')
const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb+srv://divya:Myattitude1!@cluster0.dwlaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url= "localhost:27017"
 
const nodemailer=require('nodemailer');
const bcrypt=require("bcrypt");
const connectEnsureLogin=require("connect-ensure-login")

//const passport= require("passport")
//const session = require("express-session");
//const flash=require("connect-flash");
//const cookieParser=require("cookie-parser")
//ExpressJS application
const app=express();


//////////////*******************Middleware******************///////////////
app.use(express.static("public"))
app.use(express.json())
app.use(urlencodedParser)

//app.use(cookieParser('secret'));
/*app.use(session({
  secret:'cookie_secret',
  resave:true,
  saveUninitialized:true
}));
app.use(flash());*/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/////////////********************Routes******************/////////////
//Routes for home page
app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/public/index.html');//Route handler
 
});
//Route to Contact page
app.get('/contact', (req,res)=>{
  res.sendFile(__dirname +'/public/contact.html');
});
/////Route to Login page
 app.get('/login',  (req,res)=>{
   
    res.sendFile(__dirname +'/public/login.html');
});
//Route to Register page
app.get('/register', (req,res)=>{
  res.sendFile(__dirname +'/public/register.html');
});
//Route to About page
app.get('/about', (req,res)=>{
  res.sendFile(__dirname +'/public/about.html');
});
//Route to Menu page
app.get('/menu', (req,res)=>{
  res.sendFile(__dirname +'/public/menu.html');
});
//Route to faq page
app.get('/faq', (req,res)=>{
  res.sendFile(__dirname +'/public/faq.html');
 
});
//Route for product page
app.get('/products', (req,res)=>{

  res.sendFile(__dirname +'/public/products.html');
 //res.send("You do not have access for this page")
});

app.get('/product', (req,res)=>{

  res.sendFile(__dirname +'/public/product.html');
 //res.send("You do not have access for this page")
});

app.get('/payment', (req,res)=>{

  res.sendFile(__dirname +'/public/paymentnew.html');
  key: 'pk_test_51Jehn0Dig9etiS64JoWa4tIGOgnruUg1TUPg8wEF1PHM5MIlbnhALDPfMDf7JULg94V8pSjkY0IC6dpPon8BuWcx00s4beghxb' 
  
 //res.send("You do not have access for this page")
});
//////////***********************Template Engine*****************//////////////////
app.set('view engine', 'pug')

// app.set('views', path.join(__dirname, 'views')) 
// app.set('view engine', 'ejs') 


///////////////**********Route for views*****************////////////////
app.get('/contactwelcome', (req,res)=>{
  res.render('contactwelcome')
})


// app.get('/', function(req, res){ 
//   res.render('Payment', { 
   
// }) 

/*app.get('/products/logout', (req, res)=>{
  res.render('logout')
})*/



//  app.get("/login", async (req, res)=>{
//  try{
//   MongoClient.connect(url, { useUnifiedTopology: true },  async (err, client)=> {
//     const db=client.db("register")
//   const collection =db.collection("users")
//  const allUsers= await collection.find();
//   return res.send(allUsers);
//   })
// } catch(err){
// return res.status(500).json("is an error")
//  } 
 
// })


////////////////*******************Request Handler for Register(POST requests)**********************////////////////
app.post ('/register', urlencodedParser,  async (req, res)=>{
  //console.log(req.body);
  
  try{
    /*let salt1=await bcrypt.genSalt()
    let hashedRegPassword=await bcrypt.hash(req.body.password, salt1)
    let hashedConfirmPassword=await bcrypt.hash(req.body.confirmPassword, salt1)
    console.log(salt1)
    console.log(hashedRegPassword)
    console.log(hashedConfirmPassword)*/
  let email=req.body.emailaddress;
  let firstName=req.body.firstName;
  let lastName=req.body.lastName;
  let password=req.body.password;
  let confirmPassword=req.body.confirmPassword;
  let mobile=req.body.mobile
   
 if(email && firstName && lastName && password && confirmPassword && mobile)
  { //res.status(200).send({status:'ok'})
    //console.log(req.body)
    
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mtest0649@gmail.com',
        pass:'Testing11!'
    }
});


let mailOptions={
    from:'mtest0649@gmail.com',
    to:req.body.emailaddress,
    //cc:'',
    //bcc:'',
    subject:'Testing',
    text:'it works'
    //attachment:[{filename:'', path:''}]
}


transporter.sendMail(mailOptions, (err, data)=>{
    if(err){
        console.log('Error Occurs')
    }else{
        console.log('Email sent!!')
        MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
          const db=client.db("register")
          const collection =db.collection("users")
          const doc={email:email , firstName:firstName, lastName:lastName , password:password, confirmPassword:confirmPassword , mobile:mobile };
        const findUser= await collection.findOne({email:req.body.emailaddress})
       //console.log(findUser)
            if(findUser){
             // console.log("User already exists")
              return res.status(400).send({message:'User already exists!!'})
              
    
    
            }else{
              const newUser=await collection.insertOne(doc) 
                 res.send (newUser)
                 
                  
                  
              
    
            }
          // const find = await collection.findOne({email:emailAddress})
          // console.log(`Here are the ${find} values`)
           /*if(find==null){
            collection.insertOne(doc)
           }else{
            console.log("user already exit")
           }*/
            
           /* collection.insertOne(doc, (error, result) =>{
              if(!error){
                client.close();
                  //console.log(result.ops)
                  res.send (doc)
                
      
              }else{
                client.close();
                res.send("is an error")
              }*/
         })
        
        
    }

})
    
   /* MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
      const db=client.db("register")
      const collection =db.collection("users")
      const doc={email:email , firstName:firstName, lastName:lastName , password:password, confirmPassword:confirmPassword , mobile:mobile };
    const findUser= await collection.findOne({email:req.body.emailaddress})
   //console.log(findUser)
        if(findUser){
         // console.log("User already exists")
          return res.status(400).send({message:'User already exists!!'})
          


        }else{
          const newUser=await collection.insertOne(doc) 
             res.send (newUser)
             
              
              
          

        }*/
      // const find = await collection.findOne({email:emailAddress})
      // console.log(`Here are the ${find} values`)
       /*if(find==null){
        collection.insertOne(doc)
       }else{
        console.log("user already exit")
       }*/
        
       /* collection.insertOne(doc, (error, result) =>{
          if(!error){
            client.close();
              //console.log(result.ops)
              res.send (doc)
            
  
          }else{
            client.close();
            res.send("is an error")
          }*/
     /*})*/
    
   
   
      //});
    
   
  
  
 }else{
     res.status(400).send("bad request");

  }

 }catch(ex){
    return res.status(500).send("error");
  }
});


///////////////////**********POST for Login**************//////////////////
app.post ('/login', urlencodedParser, async (req, res)=>{
  
  try{
    //let salt=await bcrypt.genSalt()
    //let hashedPassword=await bcrypt.hash(req.body.password, 10)
   // console.log(salt)
    //console.log(hashedPassword)
   //let compare=await bcrypt.compare(req.body.password, hashedPassword)
   //console.log(compare)
    
    let email=req.body.email;
    let password=req.body.password;
    
    if(email && password ){
             
      MongoClient.connect(url, { useUnifiedTopology: true },  async (err, client)=> {
        const db=client.db("register")
        const collection =db.collection("users")
        const doc={email:email , password:password };
        const loginFindUser=await collection.findOne(doc)
        console.log(loginFindUser)
        if(!loginFindUser){
          //console.log("Invalid username/password")
         return res.status(400).send({message: "Invalid username/password"})
         

        }else {
          //const newLoginUser= await collection.insertOne(doc)
          //res.send(newLoginUser)
          console.log(`Welcome ${email}`)
          //return res.json({status:'ok'})
          return res.json({status:'ok', message:`<p>Welcome ${email}</p>`})
        }
        /*collection.insertOne(doc, (error,result) =>{
          if(!error){
            client.close();
            console.log(result.ops)
            res.send (doc)
            
  
          }else{
            client.close();
            res.send("is an error")
          }
          
        });*/
      });

    }else{
      return res.status(400).send("bad request");

    }
  }catch(ex){
    return res.status(500).send("error");
  }
});


///////////////////**********POST for Contact**************//////////////////
app.post ('/contact', urlencodedParser, (req, res)=>{
  
  try{
    //console.log(req.body);
    let name=req.body.yourName;
    let email=req.body.yourEmail;
    let phone=req.body.phoneNumber;
    let message=req.body.message
    if(name && email && phone && message){
     
      MongoClient.connect(url, { useUnifiedTopology: true }, (err, client)=> {
        const db=client.db("contact")
        const collection =db.collection("contactusers")
        const doc={yourname:name , yourEmail:email, mobile:phone, message:message };
        collection.insertOne(doc, (error,result) =>{
          if(!error){
            client.close();
            console.log(result.ops)
            res.send (doc)
  
          }else{
            client.close();
            res.send("is an error")
          }
          
        });
      });

    }else{
      return res.status(400).send("bad request");

    }
  }catch(ex){
    return res.status(500).send("error");
  }
});

///////////////////**********POST for Logout**************//////////////////
app.post('/products', (req, res)=>{
 //req.flash ('test', 'it worked')
   //res.send( 'You are logged out')
   res.redirect('/')
})
///////////////////**********POST for Payment**************//////////////////

app.post('/payment', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Divya', 
      address: { 
          line1: 'Colony', 
          postal_code: 'T2A 4Y5', 
          city: 'Calgary', 
          state: 'Alberta', 
          country: 'Canada', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: netTotalNew,    // Charing Rs 25 
          description: 'Payment for Web App', 
          currency: 'CAD', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
  }); 
}) 


///////////***********GET***********////////////////

app.get('/logout', (req, res)=>{
 // req.logOut();
  res.redirect('/')
})



/*app.get ('/prodcuts', (req,res)=>{
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
    const db=client.db("register")
    const collection =db.collection("users")
    const loggedUser=await collection.findOne(email)
    console.log(loggedUser)
    if(loggedUser){
     let id= req.query.email
     console.log(id)
      res.send(`Welcome ${id}`)
    }

  
  
  })



  


})*/



////////////////////////***************Port listening*******************///////////////
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
});
