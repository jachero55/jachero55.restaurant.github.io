window.onload =()=> {
  this.cart.getAddToCartBtnId();
}
class Cart {
  constructor() {
    console.log('Cart Created')
    this.storage = new ItemStorage();
    // Create an empty array to store the items
    this.myCart = [];
  }

  // Get id of the single add to cart clicked button
  getAddToCartBtnId =()=> {
    let addCartBtn = [...document.querySelectorAll(".addToCart")];
    // let viewCartBtn = [...document.querySelectorAll(".view-cart")];
    // let inCartItem = [...document.querySelectorAll(".inCartItem")];

    addCartBtn.forEach(btn => {
      let addCartBtnId = btn.dataset.id;
      console.log("The id of the item added to cart is: ", addCartBtnId);
        // check if the item is already in cart
        let inCart = this.myCart.find(item => item.id == addCartBtnId);
        if(inCart) {
          btn.style.display = 'none'
        }else {
          btn.addEventListener('click', e => {
            // we get the items from the storage
            //Converted it to spread operator to get all the properties and added amount
            let cartItem = {...this.storage.getItems(addCartBtnId), amount: 1};
            console.log(cartItem)

            //  add the item to the empty cart that we created on top
            this.myCart = [...this.myCart, cartItem];
            console.log(this.myCart);

            // save the items in the cart to local storage
            this.storage.saveCartToStorage(this.myCart);
            // invoke add cart items 
            this.addCartItem(cartItem)
          })
        }
    })
  }

  addCartItem =(cart)=> {
    const cartContent = document.querySelector(".cartContent");
    console.log("hsgjsvf", cartContent)
    const div = document.createElement('div')
     div.innerHTML = `
                  <div class="cartItems">
                  <div class="cartProducts">
                    <span><i class="fa fa-trash-o"></i></span>
                    <img src=${cart.image}/>
                    <p>${cart.title}</p>
                  </div>
                  <p>$${cart.price}</p>
                  <div class="minAdBtns">
                    <button><i class="fa fa-minus"></i></button>
                    <p>1</p>
                    <button><i class="fa fa-plus"></i></button>
                  </div>
                  <p>$99.99</p>
                </div>
              ` 
            cartContent.appendChild(div)
  }
}