class GetItems {
  constructor() {
    console.log("Get items created!!!")
    this.getGalleryImages();
    this.getShopItems();
    this.ui = new UI;
    this.store = new ItemStorage();
  }

  // Get the images
  getShopItems = async () => {
    try{
      let response = await fetch("https://raw.githubusercontent.com/jachero55/jachero55.restaurant.github.io/main/src/data/data.json");
      let data = await response.json();
      console.log("Getting Images", data);
      let items = data.shop;
      this.ui.displayShopItems(items);
      this.store.saveItems(items)
    }catch (e) {
      console.log(e)
    }
  }

  // Get the images
  getGalleryImages = async () => {
    try{
      let response = await fetch("https://raw.githubusercontent.com/jachero55/jachero55.restaurant.github.io/main/src/data/data.json");
      let data = await response.json();
      console.log("Getting Images", data);
      let images = data.gallery;
      this.ui.displayGallery(images);
    }catch (e) {
      console.log(e)
    }
  }
}