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
  const btnLeft = document.querySelector('.pets__arrow-left')
  const btnRight = document.querySelector('.pets__arrow-right')
  const btnFirst = document.querySelector('.pets__arrow-first')
  const btnLast = document.querySelector('.pets__arrow-last')
  const numSlide = document.querySelector('.pets__number')
  const sliderWrapper = document.querySelector('.pets__slider')
  const slider = document.querySelector('.pet-wrapper')
  const cards = [];
  let index = 0;
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
      card.addEventListener('click', () => {
        let windowWidth = window.innerWidth;
        let documentWidth = document.documentElement.offsetWidth;
        document.body.append(this.popup)
        document.documentElement.style.overflow = 'hidden';
        if (windowWidth == documentWidth) return;
        document.body.style.paddingRight = '17px';
      })
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
    document.querySelector('.modal__close-icon').classList.remove('active');
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
  const createSlide = (arr, wrapper, num) => {
    const slide = document.createElement('div');
    const newArr = cards.splice(0, num);
    slide.classList.add('pets__slide');
    newArr.forEach((card, i) => {
      slide.append(card.render())
      i % 2 ? arr.unshift(card) : arr.push(card);
    })
    wrapper.append(slide)
  };
  const resetSlider = (hard = true) => {
    if (hard) slider.innerHTML = '';
    btnLeft.classList.add('inactive');
    btnFirst.classList.add('inactive');
    btnRight.classList.remove('inactive')
    btnLast.classList.remove('inactive')
    index = 0;
    numSlide.innerHTML = 1;
    slider.style.transform = `translateX(0px)`
  }
  const createSlideFromSize = () => {
    const width = parseInt(window.getComputedStyle(sliderWrapper).width);
    const amountSlides = document.querySelectorAll('.pets__slide').length;
    let fnArr = Array(6).fill(0);
    if ((amountSlides == 0 || amountSlides > 6) && width > 583) {
      resetSlider();
      fnArr.forEach(() => createSlide(cards, slider, 8))
    }
    if ((amountSlides == 0 || amountSlides == 6 || amountSlides == 16) && width == 583) {
      resetSlider();
      fnArr.concat(0, 0).forEach(() => createSlide(cards, slider, 6))
    }
    if ((amountSlides == 0 || amountSlides == 8) && width == 274) {
      resetSlider();
      fnArr.concat(...Array(10).fill(0)).forEach(() => createSlide(cards, slider, 3))
    }
  };
  const validSlideNum = (num, length) => {
    if (num <= 0) index = 0;
    if (num > length) index = length;
    btnLeft.classList.add('inactive');
    btnFirst.classList.add('inactive');
    btnRight.classList.remove('inactive')
    btnLast.classList.remove('inactive')
    if (index >= 1) {
      btnLeft.classList.remove('inactive')
      btnFirst.classList.remove('inactive')
    }
    if (index >= length) {
      btnRight.classList.add('inactive');
      btnLast.classList.add('inactive');
    }
    if (num > 0 && num < length + 1) return false;
    return true;
  }
  const slideMove = (num, back = 0) => {
    const width = parseInt(window.getComputedStyle(sliderWrapper).width);
    const amountSlides = document.querySelectorAll('.pets__slide').length;
    if (validSlideNum(num, amountSlides - 1)) return;
    if (back) back = width
    slider.style.transform = `translateX(-${width * num - back}px)`
    numSlide.innerHTML = index + 1;
  };
  const slidefirst = () => resetSlider(false);
  const slideLast = () => {
    const amountSlides = document.querySelectorAll('.pets__slide').length;
    slideMove(index = amountSlides - 1)
  };
  const slideRight = () => slideMove(++index);
  const slideLeft = () => slideMove(--index + 1, true);
  getData('../../assets/json/pets.json')
    .then(data => data.forEach(obj => cards.push(new Card(obj))))
    .then(() => createSlideFromSize())
  btnFirst.addEventListener('click', slidefirst)
  btnLast.addEventListener('click', slideLast)
  btnRight.addEventListener('click', slideRight)
  btnLeft.addEventListener('click', slideLeft)
  window.addEventListener('resize', createSlideFromSize);
  window.addEventListener('mouseover', hoverOnPopup);
  window.addEventListener('mouseover', hoverOutPopup);
  window.addEventListener('click', closePopup);
}
slidesFn();
