function hamburgerFn() {
  const btnBurger = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const nav = document.querySelector('.header__navigation');
  const closeByLink = (e) => !(e.target.closest('.navigation__link a')) || toggleMenu();
  const closeByOberlay = (e) => !(e.target.classList.contains('overlay')) || toggleMenu();
  const resizeWindow = () => !(window.innerWidth > 766 && header.classList.contains('overlay')) || toggleMenu();
  const toggleMenu = () => {
    if(window.innerWidth > 767) return;
    let windowWidth = window.innerWidth;
    let documentWidth = document.documentElement.offsetWidth;
    header.classList.toggle('overlay');
    header.classList.toggle('mobile');
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
    btnBurger.style.right = '';
    if (!header.classList.contains('mobile')) return;
    document.documentElement.style.overflow = 'hidden';
    if (windowWidth == documentWidth) return;
    document.body.style.paddingRight = '16px';
    btnBurger.style.right = '46px';
  }
  nav.addEventListener('click', closeByLink)
  btnBurger.addEventListener('click', toggleMenu)
  document.addEventListener('click', closeByOberlay);
  window.addEventListener('resize', resizeWindow);
}
hamburgerFn();
function slidesFn() {
  const btnLeft = document.querySelector('.pet__arrow-left')
  const btnRight = document.querySelector('.pet__arrow-right')
  const sliderWrapper = document.querySelector('.pets__slider')
  const slider = document.querySelector('.pet-wrapper')
  const cards = [];
  class Card {
    constructor({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
      this.name = name;
      this.img = img;
      this.type = type;
      this.breed = breed;
      this.description = description;
      this.age = age;
      this.inoculations = inoculations;
      this.diseases = diseases;
      this.parasites = parasites;
      this.popup = this.popup();
    }
    render() {
      const card = document.createElement('article');
      card.classList.add('pet', 'block-shadowed');
      /* card.addEventListener('click', () => {
        document.body.append(this.popup)
        document.documentElement.style.overflow = 'hidden';
        document.body.style.paddingRight = '16px';
      }) */
      card.innerHTML = `<img class="pet__image" src=${this.img} alt="animal">
      <div class="pet__content">
        <h4 class="pet__name">${this.name}</h4>
        <div class="pet__button">
          <button class="button button_bordered">Learn more</button>
        </div>
      </div>`
      return card;
    }
    popup() {
      const popup = document.createElement('div');
      popup.classList.add('modal-overlay');
      popup.innerHTML =
        `<div class="modal">
        <img class="modal__close-icon" src="../../assets/icons/modal_close_button.svg" alt="closeBtn">
          <div class="animal">
            <div class="animal__image"><img src=${this.img} alt=""></div>
            <div class="animal__content">
              <h3 class="animal__name">${this.name}</h3>
              <h4 class="animal__animal">${this.type}-${this.breed}</h4>
              <div class="animal__description">${this.description}</div>
              <div class="animal__list">Age: <span class="list-age">${this.age}</span></div>
              <div class="animal__list">Inoculations: <span class="list-inoculations">${this.inoculations}</span></div>
              <div class="animal__list">Diseases: <span class="list-diseases">${this.diseases}</span></div>
              <span class="animal__list">Parasites: <span class="list-parasites">${this.parasites}</span>
            </div>
          </div>
      </div>`
      return popup;
    }
  }
  const closePopup = e => {
    if (!e.target.closest('.modal-overlay')) return;
    if (e.target.closest('.animal')) return;
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
    document.querySelector('.modal-overlay').remove();
  }
  const hoverOnPopup = e => {
    if (!e.target.closest('.modal-overlay')) return;
    document.querySelector('.modal__close-icon').classList.add('active')
  }
  const hoverOutPopup = e => {
    if (!e.target.closest('.animal')) return;
    document.querySelector('.modal__close-icon').classList.remove('active')
  }
  const getData = async url => {
    let response = await fetch(url);
    if (!response.ok) { throw new Error(`Ошибка статус ${response.status}`); }
    return await response.json();
  };
  const createCards = (arr, wrapper, num) => {
    let newArr = cards.splice(0, num);
    newArr.forEach(card => wrapper.append(card.render()))
    arr.push(...newArr);
  };
  const createCardsFromSize = () => {
    const slides = document.querySelectorAll('.pet')
    if (slides.length == 3) return;
    createCards(cards, slider, 1);
    if (slides.length == 2) return;
    createCards(cards, slider, 1);
  };
  const slideMove = (sideClass, num) => {
    slider.innerHTML = '';
    const width = window.getComputedStyle(sliderWrapper).width;
    parseInt(width) < 994 ? parseInt(width) < 584 ? num = 1 : num = 2 : num = 3;
    createCards(cards, slider, num)
    const slides = document.querySelectorAll('.pet')
    slides.forEach(slide => slide.classList.add(sideClass))
  };
  const slideRight = () => slideMove('slideRight');
  const slideLeft = () => slideMove('slideLeft');
  getData('../../assets/json/pets.json')
    .then(data => data.forEach(obj => cards.push(new Card(obj))))
    .then(() => createCards(cards, slider, 3))
/*   btnRight.addEventListener('click', slideRight)
  btnLeft.addEventListener('click', slideLeft)
  window.addEventListener('resize', createCardsFromSize);
  window.addEventListener('mouseover', hoverOnPopup);
  window.addEventListener('mouseover', hoverOutPopup);
  window.addEventListener('click', closePopup); */
}
slidesFn();
