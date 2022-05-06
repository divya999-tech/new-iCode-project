
  const cartClick = document.getElementsByClassName("cardbutton");
  let products=[
      {
          title:"Amla pickle",
          price:"$9.99",
          weight:"0.95 kg",
          tag:'amla',
          image:"amla.jpg",
          inCart:0
  
      },
      {
          title:"Chicken pickle",
          price:"$15.99",
          weight:"0.85 kg",
          tag:'chicken',
          image:"chicken.png",
          inCart:0
  
      },
      {
          title:"Mango pickle",
          price:"$10.99",
          weight:"0.50 kg",
          tag:"mango-new",
          image:"mango-new.png",
          inCart:0
      },
  
     {
          title:"Garlic pickle",
          price:"$7.99",
          weight:"0.25 kg",
          tag:"garlic",
          image:"garlic.jpg",
          inCart:0
      },
      {
          title:"Mutton pickle",
          price:"$19.99",
          weight:"0.75 kg",
          tag:"mutton-pickle",
          image:"mutton-pickle.webp",
          inCart:0
      },
      {
          title:"Lemon pickle",
          price:"$9.99",
          weight:"0.15 kg",
          tag:"lemon",
          image:"lemon1.jpg",
          inCart:0
      }
  ]
  
  for(let i = 0; i<cartClick.length; i++){
      let cartButton=cartClick[i]
      cartButton.addEventListener("click", ()=>{
          addItemsToCart(products[i])
          
      }
      )
      
  }
  
  
  function onLoadCartNumbers(){
      let productNumbers=localStorage.getItem('cartNumbers')
      if(productNumbers){
          document.querySelector(".cart-link span").textContent=productNumbers
      }
  }
  
  function addItemsToCart(product){
      
         let productNumbers=localStorage.getItem('cartNumbers');
         
          productNumbers=parseInt(productNumbers)
          
       if(productNumbers){
           localStorage.setItem('cartNumbers',productNumbers+ 1)
           document.querySelector(".cart-link span").textContent = productNumbers+1;
       }else{
           localStorage.setItem('cartNumbers', 1)
           document.querySelector(".cart-link span").textContent=1;
       }
       
       setItems(product)

       
       
       }

   
  
  function setItems(product){
     let cartItems=localStorage.getItem("productsInCart")
     cartItems = JSON.parse(cartItems)
     if(cartItems!=null){
        if(cartItems[product.weight]==undefined){
            cartItems={
                ...cartItems,
                [product.weight]:product
            }
        }
  
      cartItems[product.weight].inCart += 1;
     }else{
         product.inCart=1
      cartItems={
          [product.weight]:product
      }
  }
      
      
      localStorage.setItem("productsInCart",JSON.stringify(cartItems) )
  }
  function displayCart(){
  let cartItems=localStorage.getItem("productsInCart")
  
  
  cartItems=JSON.parse(cartItems)
  
  let productContainer=document.querySelector(".wishlist")
  if(cartItems && productContainer){
     
      productContainer.innerHTML='';
      Object.values(cartItems).map(item=>{
          productContainer.innerHTML += `
          <div class="row mb-4 cart-rows">
                    <div class="col-md-5 col-lg-3 col-xl-3">
                      <div
                        class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0"
                      >
                        <img
                          class="img-fluid w-100"
                          src="images/${item.image}"
                          alt="${item.tag}"
                        />
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9 cart-items">
                      <div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h5 class="title">${item.title}</h5>
  
                            <p class="mb-3 text-muted text-uppercase small">
                              Weight:${item.weight}
                            </p>
                          </div>
                          <div>
                            <div
                              class="
                                def-number-input
                                number-input
                                safari_only
                                mb-0
                                w-100
                              "
                            >
                              <button
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                class="minus decrease"
                              >
                                <i class="fas fa-minus-circle"></i>
                              </button>
                              <input
                                class="quantity"
                                min="0"
                                name="quantity"
                                value=${item.inCart}
                                type="number"
                              />
                              <button
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                class="plus increase"
                              >
                                <i class="fas fa-plus-circle"></i>
                              </button>
                            </div>
                            
                          </div>
                        </div>
                        <div
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                        >
                          <div>
                            <a
                              
                              type="button"
                              class="
                                card-link-secondary
                                small
                                text-uppercase
                                mr-3
                              "
                              ><i class="fas fa-trash-alt mr-1"></i> Remove item
                            </a>
                          </div>
                          <p class="mb-0">
                            <span><strong class="summary">${item.price}</strong></span>
                          </p>
                        </div>
                        <div>
                          <p class="mb-0">
                            <span
                              ><strong class="pricechange"
                                >Total price of the item:$20.99</strong
                              ></span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>`
                  
      })
  }
  } 
  
  
  
  
  
    window.addEventListener("load", function() {
    const removeCartItems = document.getElementsByClassName("card-link-secondary");
    for (let i=0;i<removeCartItems.length;i++){
       const button=removeCartItems[i]
      
      button.addEventListener("click",(event)=>{
        let buttonClicked=event.target
        let result = buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        
        updateTotal()
        
         })
         quantityChange()
  
         
        }
        
  
  
       
  
  
  
  function quantityChange(){
    
      const quantityInputs=document.getElementsByClassName("quantity")
    
    for (let i=0;i<quantityInputs.length;i++){
        let input=quantityInputs[i]
        
        input.addEventListener('change', quantityChanged)
        
    }
    
    
  }
   
  
  function quantityChanged(event){
    let input=event.target
    if(isNaN(input.value)|| input.value<0){
    input.value=1
  }else {
    const cartNumber=document.querySelector("#cart")
    let productsNum=localStorage.getItem("cartNumbers")
    let newProductsNums=parseInt(productsNum)
    if(newProductsNums){
      localStorage.setItem('cartNumbers',newProductsNums+1)
    cartNumber.textContent=newProductsNums+1
    
  }
  
  }
  updateTotal()
  
  }
  
  
  function updateTotal(){
    
      const cartItem=document.getElementsByClassName("wishlist")[0]
    
  const cartRows=cartItem.getElementsByClassName("row")
  
  let total=0
  let tax=5
  for(let i=0;i<cartRows.length;i++){
    let cartRow=cartRows[i]
    
    let priceElement=cartRow.getElementsByClassName("summary")[0]
    let quantityElement=cartRow.getElementsByClassName("quantity")[0]
    let priceChange=cartRow.getElementsByClassName("pricechange")   
    let price=parseFloat(priceElement.innerText.replace('$',''))
     
   let quantity=quantityElement.value
   priceChanged=price * quantity
   points=Math.round(priceChanged*100)/100
   
   document.getElementsByClassName("pricechange")[i].innerText='The total price: ' + points
   total=total + (price * quantity)
  
   
  
  }
  total=Math.round(total*100)/100
  
  shipping=total*(tax/100)
  shippingCharges=Math.round(shipping*100)/100
  
  netTotal=total + shippingCharges
  netTotalNew=Math.round(netTotal*100)/100
  
  document.getElementsByClassName("grossprice")[0].innerText='$' + total
  document.getElementsByClassName("taxes")[0].innerText=shippingCharges
  document.getElementsByClassName("netprice")[0].innerText= '$' + netTotalNew
  
  
  
      
  
    
  }
  
//   function setItems(product){
//     let cartItems=localStorage.getItem("productsInCart")
//     cartItems = JSON.parse(cartItems)
//     if(cartItems!=null){
//        if(cartItems[product.weight]==undefined){
//            cartItems={
//                ...cartItems,
//                [product.weight]:product
//            }
//        }
 
//      cartItems[product.weight].inCart += 1;
//     }else{
//         product.inCart=1
//      cartItems={
//          [product.weight]:product
//      }
//  }
     
     
//      localStorage.setItem("productsInCart",JSON.stringify(cartItems) )
//  }

  // function reduceCart(product){
  //    let productsNum=localStorage.getItem("productsInCart")
  //    productsNum=JSON.parse(productsNum)
  //    if (productsNum){
  //     product.inCart-=1;
  //    }
      
     
    
  // //     if(newProductsNums){
  // //        localStorage.setItem('cartNumbers',newProductsNums-1)
  // //     cartNumber.textContent=newProductsNums-1
  // // }   
  // }

  
  });
  
  
  // function changeCartNumber(){
  //      const cartNumber=document.querySelector("#cart")
       
     
      
  //    let productsNum=localStorage.getItem("cartNumbers")
  //    let newProductsNums=parseInt(productsNum)
     
    
  //    if(newProductsNums){
  //       localStorage.setItem('cartNumbers',newProductsNums-1)
  //     cartNumber.textContent=newProductsNums-1
  //   }else{
  //     localStorage.setItem('cartNumbers',newProductsNums + 1)
  //    cartNumber.textContent=newProductsNums + 1
  //   }
   
  //     }
  
     
    
       onLoadCartNumbers();
       displayCart();
      