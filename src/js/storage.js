class ItemStorage {
  constructor() {
    console.log("Storage created")
  }

  // create static method
  saveItems =(items)=>{
    localStorage.setItem("items", JSON.stringify(items));
  }

  // get the items from the local storage
  getItems = (itemId)=> {
    let items = JSON.parse(localStorage.getItem("items"))
        return items.find(item => item.id == itemId);
  }

  // save cart items to storage
  saveCartToStorage = (cart)=>{
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // check if the items are in the storage and populate the cart
  getCartItems = ()=>{
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  }

  // clear the storage
  clearCartStorage =()=>{
    return localStorage.removeItem('cart')
  }
}