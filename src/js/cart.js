class Cart {
  constructor() {
    console.log("Cart Created!!!")
    this.storage = new ItemStorage();
    // create an empty cart array
    this.myCart = [];
    this.showCart();
    this.closeCart();
  }

  showCart =()=>{
    let showMyCart = [...document.querySelectorAll('.cart-btn')]
    showMyCart.forEach((cartEvent)=> {
      cartEvent.addEventListener('click', (e) => {
        const carOverlay = document.querySelector(".cart-overlay");
        const cart = [...document.querySelectorAll(".cart")];
        console.log("OPEN CART");
        carOverlay.classList.add('showOverlay');
        cart.forEach((showCart)=> {
          showCart.classList.add('show_cart');
        })
      })
    })
  }

  closeCart =()=> {
    document.querySelector('.close-cart').addEventListener('click', (e) => {
      e.preventDefault();
      const carOverlay = document.querySelector(".cart-overlay");
      const cart = document.querySelector(".cart");

      carOverlay.classList.remove('showOverlay');
      cart.classList.remove('show_cart');
    })
  }

  //  Cart functionality

  // get the id of the clicked single item add to cart button
  getAddToCartBtnId =()=>{
    let addCartBtn = [...document.querySelectorAll(".addToCart")];
    let viewCartBtn = [...document.querySelectorAll(".view-cart")];
    let inCartItem = [...document.querySelectorAll(".inCartItem")];
    
    addCartBtn.forEach((btn) => {
      let addCartBtnId = btn.dataset.id;
        console.log("The id of the item added to cart is: ", addCartBtnId);
        // check if the item is already in cart
        let inCart = this.myCart.find(item => item.id == addCartBtnId);
        if(inCart){
          btn.style.display = 'none'
          viewCartBtn.forEach((viewBtn)=> {
            viewBtn.style.display = "block"
            viewBtn.style.backgroundColor = '#697A21'
            viewBtn.addEventListener('click', (e)=> {
              // Closing the singleItem modal after item is added to the cart
              let itemOverlay = document.querySelector(".product-overlay");
              itemOverlay.style.display = "none";
              // Showing the cart after item is added to the cart
              const carOverlay = document.querySelector(".cart-overlay");
              const cart = document.querySelector(".cart");
              console.log("OPEN CART");
              carOverlay.classList.add('showOverlay');
              cart.classList.add('show_cart');
            })
          })

          inCartItem.forEach((item) => {
            item.style.display = 'block'
          })
        }else {
          btn.addEventListener('click', (e) => {
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
        
              // Closing the singleItem modal after item is added to the cart
              let itemOverlay = document.querySelector(".product-overlay");
              itemOverlay.style.display = "none";
              // Showing the cart after item is added to the cart
              const carOverlay = document.querySelector(".cart-overlay");
              const cart = document.querySelector(".cart");
              console.log("OPEN CART");
              carOverlay.classList.add('showOverlay');
              cart.classList.add('show_cart');
          })
        }
    })
  }

  // setting cart values
  setCartValues =(myCart)=>{
    let cartItems = [...document.querySelectorAll(".cart-items-count")];
    let totalCart = [...document.querySelectorAll(".cart-total")];
    let tempTotal = 0;
    let itemsTotal = 0;

    myCart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    totalCart.forEach((tot)=>{
      tot.innerHTML = parseFloat(tempTotal.toFixed(2));
    })
    cartItems.forEach((totCart)=>{
      totCart.innerHTML = itemsTotal;
    })
    console.log(cartItems, totalCart)
  }

  // Display the cart items
  addCartItem = (item)=>{
    const cartContent = document.querySelector(".cart-item");
    const div = document.createElement('div')

    // cartContent.forEach((cartCont)=>{
      div.innerHTML = `
      <div class="cart-content-display">
        <img src=${item.image} alt="water" />
      <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span data-id=${item.id} class="remove-item" >Remove</span>
      </div>
      <div>
        <i data-id=${item.id} class="fa fa-chevron-up"></i>
        <p class="item-amount" data-id=${item.id}>1</p>
        <i data-id=${item.id} class="fa fa-chevron-down"></i>
      </div>
      </div>
    `
    cartContent.appendChild(div)
    // })
    this.setCartValues(this.myCart);
    this.clearTheCart();
    this.deleteAnItem();
  }

  // setup the cart to load items that already exists in the local storage
  setUpCart = () => {
    if (this.myCart.length < 1) {
      let emptyCart = document.querySelector('.cart-empty')
      emptyCart.innerText = 'Your Cart is Empty.'
    }else {

      
    }
    this.myCart = this.storage.getCartItems();
    this.populateCart(this.myCart)
    this.increaseDecreaseQuantity();
  }

  // method to populate cart
  populateCart =(cart)=> {
    cart.forEach(item => this.addCartItem(item))
  }

  // delete item
  deleteAnItem =()=>{
    let deleteBtn = [...document.querySelectorAll('.remove-item')];
    let cartContent = document.querySelector(".cart-item");
    deleteBtn.forEach((button)=>{
      button.addEventListener('click', (e)=>{
        // Getting the id of the item to be removed from the array and local storage
        let removeItemId = button.dataset.id;
        console.log("The id of the item removed from cart: ", removeItemId);
        this.myCart = this.myCart.filter(item => item.id != removeItemId);
        // After removing the item, we also want to remove it from the DOM
        let removeItem = e.target;
        console.log('Item to be removed', removeItem.parentElement.parentElement)
        cartContent.removeChild(removeItem.parentElement.parentElement.parentElement)
        // update the cart by running setCartValue function
        this.setCartValues(this.myCart);
        // save the updated cart to storage
        this.storage.saveCartToStorage(this.myCart)
      })
    })
  }

  clearTheCart =()=>{
    let clearCart = document.querySelector('.clear-cart');
    let cartContent = document.querySelector('.cart-item')
    clearCart.addEventListener('click', e => {
      // check for the length of the cart content
      while(cartContent.children.length > 0) {
        // Remove the cart content from the DOM
        cartContent.removeChild(cartContent.children[0])
      }
      // Empty the array
      this.myCart = []
      // Clear the local storage
      this.storage.clearCartStorage();
      // update the cart by running setCartValue function
      this.setCartValues(this.myCart);
      // save the updated cart to storage
      // this.storage.saveCartToStorage(this.myCart)
      
    })
    
  }

  
  // Remove, Increase, and Decrease the items
  increaseDecreaseQuantity =()=>{
    const cartContent = document.querySelector(".cart-item");
     // add event to the cart content container
     cartContent.addEventListener('click', e => {
      if(e.target.classList.contains('fa-chevron-down')) {
        let reduceAmount = e.target;
        let id = reduceAmount.dataset.id;
        let tempItem = this.myCart.find(item => item.id == id)
        tempItem.amount = tempItem.amount - 1;
        if(tempItem.amount > 0) {
          this.storage.saveCartToStorage(this.myCart);
          this.setCartValues(this.myCart)
          reduceAmount.previousElementSibling.innerText = tempItem.amount
        }else {
            cartContent.removeChild(reduceAmount.parentElement.parentElement.parentElement);
            this.deleteAnItem();
        }
      }
      else if(e.target.classList.contains('fa-chevron-up')) {
        let addAmount = e.target
        let id = addAmount.dataset.id
        console.log(addAmount)
        let tempItem = this.myCart.find(item => item.id == id);
        tempItem.amount = tempItem.amount + 1;
        this.storage.saveCartToStorage(this.myCart);
        this.setCartValues(this.myCart)
        addAmount.nextElementSibling.innerText = tempItem.amount
      }
    })
  }

  // quantity decrease
  decreaseQuantity=()=>{

  }
}