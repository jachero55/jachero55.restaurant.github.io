class App {
  constructor() {
    this.slide = new Slider();
    this.nav = new Navbar();
    this.fetchItems = new GetItems();
    this.modal = new Modal();
    this.storage = new ItemStorage();
    this.validation = new Validation()
    this.cart = new Cart();
    this.ui = new UI();
  }

  // Implement singleton
  // condition to check if controller instance already created
  // If there's no instance, we create one
  static getInstance = () => {
    if(!App._instance) {
      App._instance = new App();
      return App._instance;
    } else {
      // Throw an error if one already exits
      throw "There can only be one instance of an APP!!!";
    }
  }
}

// self executing method
(() => {
  const app = App.getInstance();
})();