class Navbar {
  constructor() {
    console.log("Navbar Created!!!")
    this.openMenu();
    this.toggleUserDropdown();
  }
  openMenu = () => {
    // Select the elements
    let nav = document.querySelector("ul");
    let menuBtn = document.querySelector(".hamburger_menu .fa");

    menuBtn.addEventListener('click', ()=>{
      nav.classList.toggle('navActive');
      console.log("You clicked me")
    })
  }

  toggleUserDropdown =()=> {
    const user_btn = document.querySelector(".user-btn");
    const user_dropDown = document.querySelector("#user-info");

    user_btn.addEventListener('click', (e) => {
      user_dropDown.classList.toggle('dropdown');
      console.log("CLICK")
    })
  }
}