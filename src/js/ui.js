class UI {
  constructor(){
    console.log("UI created!!!")
    this.cart = new Cart();
  }

  displayShopItems = async (shopProducts) => {
    let shopItems = [];
    this.shopItems = shopProducts;
    shopItems = shopProducts;
    console.log("All Images", shopItems)
    let DOM = document.querySelector(".products-container");
    let result = '';
    await shopItems.forEach(element => {
      result += `
      <div class="card-item">
        <img src=${element.image} alt="mat" />
        <h3>${element.title}</h3>
        <p>$${element.price}</p>
        <button class="openItemModalBtn" data-id=${element.id}>More Details</button>
      </div>
      `
      DOM.innerHTML = result;
      DOM.style.display = 'grid'
      $(".card-item").slice(0, 8).show();
    });
    // Invoke the items buttons function
    this.cart.setUpCart();
    this.getSingleItemBtn();
    this.closeSingleItemModal();
    this.loadMoreItems();
  }

  loadMoreItems = () => {
    $(".load-more").on('click', () => {
      $(".card-item:hidden").slice(0, 4).show();

      if($(".card-item:hidden").length == 0) {
        $(".load-more").fadeOut();
      }
    })
  }

  // Buttons to open the single item modal
  getSingleItemBtn = () => {
    let itemBtn = [...document.querySelectorAll(".openItemModalBtn")];
    let itemOverlay = document.querySelector(".product-overlay");
    itemBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
          // storing each item
          const itemId = e.target.dataset.id;
          console.log("This One is Dope", e.target.dataset);
          itemOverlay.style.display = "block";

          // invoke open single item modal
          this.openItemModal(itemId);
      })
    })
  }

  // Single item modal open
  openItemModal = async (itemId) => {
    let itemOverlay = document.querySelector(".product-overlay");
    let openItem = document.querySelector(".item-content-container");

    // modal
    const item = await this.shopItems.find(item => item.id == itemId);
    // store the products in a variable
    const result = `
                <div class="itemModal">
                <span class="inCartItem">Item In Cart</span>
                <img src=${item.image} alt="person"/>
                <div class="item-details">
                  <h3>${item.title}</h3>
                  <h4>$${item.price}</h4>
                  <h4>Description</h4>
                  <p>${item.text}</p>
                  <button class="addToCart" data-id=${item.id}>Add To Cart</button>
                  <button class="view-cart" data-id=${item.id}>View Cart</button>
                </div>
              </div>
            `
      openItem.innerHTML = result;
      itemOverlay.style.display = "block"

      // invoking the getAddToCartBtnId to cart btn function
      this.cart.getAddToCartBtnId();
  }
  // Close single item modal
  closeSingleItemModal = () => {
    document.querySelector(".close-modal").addEventListener('click', (e) => {
      e.preventDefault();
      let itemOverlay = document.querySelector(".product-overlay");
      itemOverlay.style.display = "none";
    })
  }

  // Display gallery Images
  displayGallery = async (images) => {
    let myGallery = [];
    this.myGallery = images;

    myGallery = images;
    console.log("All Images", myGallery)

    // Get the DOM element
    let DOMImage = document.querySelector(".gallery-container");

    // variable to store the food
    let result = '';

    // Iterate the array and get the images
    await myGallery.forEach(element => {
      // variable for the result
      result += `
      <div class="image">
          <div class="image-container">
          <img class="image-modal" data-id=${element.id} src=${element.image} alt="person"/>
          </div>
      </div>
      `
      // Inject the items in the DOM
      DOMImage.innerHTML = result;
      this.imageClickFunc();
    });
  }

  // Getting the images
  imageClickFunc = () => {
    // get the images
    const singleImageClick = [...document.querySelectorAll(".image-modal")];
    // Iterate through the images
    singleImageClick.forEach((imgClick)=> {
      imgClick.addEventListener("click", (e)=>{
        e.preventDefault();
        // storing each image
        const imageId = e.target.dataset.id;

        // invoking the open single image modal
        this.openGalleryModal(imageId);
      })
    })
  }

  // Open gallery Image modal
  openGalleryModal = async (imageId) => {
    // Select the modal overlay
    const galleryOverlay = document.querySelector(".gallery-overlay");
    const singleImage = document.querySelector(".image-modal");
    // modal
    const imageG = await this.myGallery.find(imageG => imageG.id == imageId);
    // store the products in a variable
    const result = `
            <div>
              <div class="close-modal">
                <span><i class="fa fa-times"></i></span>
              </div>
                <img src=${imageG.image} alt="person"/>
            </div>
        `
        singleImage.innerHTML = result;
        galleryOverlay.style.display = "block";
        // singleImage.classList.add('slideModal');

        this.closeImageModal();
  }

  // Close the modal
  closeImageModal = () => {
    const closeModal = document.querySelector(".close-modal");
    const galleryOverlay = document.querySelector(".gallery-overlay"); 

    closeModal.addEventListener("click", () => {
      galleryOverlay.style.display = "none";
    })
  }
}