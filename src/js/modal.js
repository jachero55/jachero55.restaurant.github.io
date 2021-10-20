class Modal {
  constructor(){
    console.log("Modal Created!!!!")
    
    this.openTestimonialModal();
    this.closeTestimonialModal();
    this.ui = new UI();
    this.validation = new Validation()
    this.savePost();
    this.loggedIn()
    this.signIn();
    this.signUp();
    this.signUpForm()
    this.signInForm();
    this.fetchUserData();
    this.closeUserForm()
  }

  // Button event listener to open the gallery modal
  openModal =()=>{
    // Get the DOM elements
    let imageModal = [...document.querySelectorAll(".image-modal")];
    // iterate through the images
    imageModal.forEach((galleryImage)=> {
      galleryImage.addEventListener('click', (e) => {
        e.preventDefault();
        // storing the images
        const imageId = e.target.dataset.id;
        console.log("Food Id: ", imageId);
        // invoking the open modal function
        this.ui.openGalleryModal(imageId);
      })
    })
  }

  openTestimonialModal =()=> {
    let modalOverlay = document.querySelector(".user-auth-overlay");
    document.querySelector(".addTestmonial").addEventListener('click', (e) => {
      e.preventDefault()
      modalOverlay.style.display = "block"
    })
  }

  closeUserForm =()=>{
    document.querySelector('.close-user-form').addEventListener('click', e => {
      document.querySelector(".user-auth-overlay").style.display = "none";
    })
  }

  closeTestimonialModal =()=>{
    let modalOverlay = document.querySelector(".testimonial-overlay");
    document.querySelector('.cancelBtn').addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.style.display = "none"
    })
  }

  // POSTING REVIEWS
  savePost =()=> {
      document.querySelector(".submit").addEventListener('click', (e)=>{
      e.preventDefault();
      var today = new Date();
      var postUserDetails = {
        postUser : { 
          // This is for the user post
          message: document.querySelector("#message").value,
          date:today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
         },
        userDetails : { 
          // This is for the user registration
          firstName: document.querySelector("#firstName").value,
          lastName: document.querySelector("#lastName").value,
          userEmail: document.querySelector("#userEmail").value,
          userPassword: document.querySelector("#userPassword").value
         }
      };
      console.log("POST USER DETAILS" ,postUserDetails)
      if(localStorage.getItem('userData') === null) {
        let userData = [];
        userData.push(postUserDetails);
        // save user data in the local storage
        localStorage.setItem('userData', JSON.stringify(userData));
       
        let modalOverlay = document.querySelector(".testimonial-overlay");
        modalOverlay.style.display = "none"
        this.fetchUserData()
        document.forms[0].reset();
      }else {
         let data = JSON.parse(localStorage.getItem("userData"));
         data.push(postUserDetails);
        // save user data in the local storage
        localStorage.setItem('userData', JSON.stringify(data));
        document.forms[0].reset();

        let modalOverlay = document.querySelector(".testimonial-overlay");
        modalOverlay.style.display = "none"
        this.fetchUserData()
      }
    })
  }

  loggedIn =()=> {
      document.querySelector(".signInBtn").addEventListener('click', (e)=> {
        let email = document.querySelector("#email").value;
        let userPass = document.querySelector("#password").value;
        e.preventDefault()
        // if(this.validation.userNameValidation() && this.validation.passwordValidation()){
          let data = localStorage.getItem("userData");
          if(data.includes(email) && data.includes(userPass)) {
            console.log("WE FOUND A USER")
            document.forms[0].reset();
          }else {
            console.log("NO USER FOUND")
          }
        // }
      })  
  }

  fetchUserData = ()=>{
    let getData = JSON.parse(localStorage.getItem("userData"));
    // const sortGetData = getData.slice().sort((a, b) => {
    //   b.date - a.date
    // })
    let data = document.querySelector(".add-review");
    let result = ''
    getData.reverse().forEach((sortedData) => {
      result += `
                <div class="review-padding">
                <div class="review-display">
                  <h3>${sortedData.userDetails.firstName}${' '}${sortedData.userDetails.lastName}</h3>
                  <div class="review-icons">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-half-o"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                  <h4>${sortedData.postUser.date}</h4>
                </div>
                <p>${sortedData.postUser.message}</p>
              </div>
      `
      data.innerHTML = result;
    })
  }

  signIn = () => {
    let btn = document.querySelector("#signIn");
    let btnSignUp = document.querySelector("#signUp");
    let signInForm = document.querySelector("#content1");
    let signUpForm = document.querySelector("#content2");
    btn.addEventListener('click', (e) => {
        signInForm.style.display = 'block'
        signUpForm.style.display = 'none'
        btn.style.color = '#FFA630'
        btnSignUp.style.color = '#222';
    })
  }

  signUp = () => {
    let btnSignUp = document.querySelector("#signUp");
    let btn = document.querySelector("#signIn");
    let signUpForm = document.querySelector("#content2");
    let signInForm = document.querySelector("#content1");
    btnSignUp.addEventListener('click', (e) => {
        signUpForm.style.display = 'block'
        signInForm.style.display = 'none'
        btnSignUp.style.color = '#FFA630'
        btn.style.color = '#222'
    })
  }

  signUpForm =()=> {
    document.querySelector(".signUpBtn").addEventListener('click', (e) =>{
      e.preventDefault();
      document.querySelector(".testimonial-overlay").style.display = "block";
      document.querySelector(".user-auth-overlay").style.display = "none";
      document.forms[0].reset();
    })
  }

  signInForm =()=> {
    document.querySelector(".signInBtn").addEventListener('click', (e) =>{
      e.preventDefault();
      document.querySelector(".testimonial-overlay").style.display = "block";
      document.querySelector(".user-auth-overlay").style.display = "none";
      document.forms[0].reset();
    })
  }
}