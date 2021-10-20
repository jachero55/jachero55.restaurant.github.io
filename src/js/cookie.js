class Cookie {
  constructor() {
    console.log("Cookie Created")
  }

  cookieStart = () =>{
    const cookieStorage = {
      getItem: (key) => {
        const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {})
      return cookies[key]
      }
    }
    const storageType = cookieStorage;
    const consentPropertyName = 'jdc_consent'

    const shouldShowPopUp = () => !storageType.getItem(consentPropertyName);
    const saveToStorage = () => storageType.setItem(consentPropertyName, true)
    this.showingTheCookie(shouldShowPopUp, saveToStorage, storageType)
  }

  showingTheCookie =(popShow, saveStorage, storageT)=>{
    // get the dom elements
    const cookiePop = document.querySelector('#cookie')
    const acceptBtn = document.querySelector('#accept')

    const acceptBtnFunc = e => {
      saveStorage(storageT);
      cookiePop.classList.add('hidden');
    }

    acceptBtn.addEventListener('click', acceptBtnFunc)

    if(popShow()) {
      setTimeout(()=> {
        cookiePop.classList.remove('hidden')
      }, 2000)
    }
  }
}