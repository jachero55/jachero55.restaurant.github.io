class Validation {
  constructor() {
    console.log("Validation Created!!!")
  }
  // validate user name
  userNameValidation=()=>{
    const username = document.querySelector("#userName");
    // check if is empty
    if(this.checkIfEmpty(username)) {
        return;
    }
    // check if it has only letters
    if(!this.checkOnlyLetters(username)) return
      return true;
  }

  // validate user email
  emailValidation=()=>{
    const email = document.querySelector("#email");
    // check if is empty
    if(this.checkIfEmpty(email)) {
        return;
    }
    // check if it has only letters
    if(!this.passwordContainCharacters(email, 5)) return
      return true;
  }


  // validate user password
  passwordValidation=()=>{
    const password = document.querySelector("#userPassword");
    // check if is empty
    if(this.checkIfEmpty(password)) {
        return;
    }
    // check if it has only letters
    if(!this.meetLength(password, 4, 100)) return
      // check password against character set
      if(!this.passwordContainCharacters(password, 1)) return true
      return true
  }

  checkIfEmpty=(field)=>{
    if(this.isEmpty(field.value.trim())) {
      // set the field invalid
      this.setInvalid(`${field.name} must not be empty`)
      return true
    }else {
      // set field to valid
      this.setValid()
      return false
    }
  }

  isEmpty=(value)=>{
    if(value === '')return true;
    return false;
  }

  setInvalid=(message)=>{
    let er = document.querySelector(".error");
    er.innerHTML = message;
    er.style.display = 'block'
  }

  setValid=()=>{
    let er = document.querySelector(".error");
    er.innerHTML = '';
  }

  checkOnlyLetters=(field)=>{
    if(/^[a-zA-Z ]+$/.test(field.value))  {
      this.setValid()
      return true
    }else {
      this.setInvalid(`${field.name} must contain only letters`);
      return false
    }
  }

  meetLength=(field, minLength, maxLength)=>{
    if(field.value.length >= minLength && field.value.length < maxLength) {
      this.setValid()
      return true;
    }
    else if(field.value.length < minLength) {
      this.setInvalid(`${field.name} must be at least ${minLength} character long`)
      return false;
    }else {
      this.setInvalid(`${field.name} must be shorter than ${maxLength} characters`)
      return false
    }
  }

  passwordContainCharacters=(field, code)=>{
    let regEx;
    switch(code) {
      case 1:
        // letters
        regEx = /(?=.*[a-zA-Z])/;
        return this.passwordMatchRegex(regEx, field, 'Must contain at least one letter')
      case 2:
          // 1 letter and one number
          regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
          return this.passwordMatchRegex(regEx, field, 'Must contain at least one letter and one number')
      case 3:
            // uppercase, number, and lowercase
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return this.passwordMatchRegex(regEx, field, 'Must contain at least one uppercase, one lowercase letter and number')
      case 4:
            // uppercase, number, lowercase, and special characters
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return this.passwordMatchRegex(regEx, field, 'Must contain at least one uppercase, one lowercase letter and number')
      case 5:
            // email pattern
            regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.passwordMatchRegex(regEx, field, 'Must be a valid email address')
        default: 
          return false
    }
  }

  // function to test password reg
  passwordMatchRegex=(regex, field, message)=>{
    if(field.value.match(regex)){
      this.setValid()
      return true
    }else {
      this.setInvalid(message)
      return false
    }
  }

  validateUserLogin =()=>{

  }

  validateUserContactForm =()=>{

  }

  validateUserReviewForm =()=>{

  }
}