function hamburgerFn() {
  const btnBurger = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const nav = document.querySelector('.header__navigation');
  const closeByLink = (e) => !(e.target.closest('.navigation__link a')) || toggleMenu();
  const closeByOberlay = (e) => !(e.target.classList.contains('overlay')) || toggleMenu();
  const resizeWindow = () => !(window.innerWidth > 766 && header.classList.contains('overlay')) || toggleMenu();
  const toggleMenu = () => {
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
    constructor({ name, img }, wrapper) {
      this.name = name;
      this.img = img;
      this.wrapper = wrapper;
    }
    render() {
      const card = document.createElement('article');
      card.classList.add('pet', 'block-shadowed');
      card.innerHTML = `<img class="pet__image" src=${this.img} alt="animal">
      <div class="pet__content">
        <h4 class="pet__name">${this.name}</h4>
        <div class="pet__button">
          <button class="button button_bordered">Learn more</button>
        </div>
      </div>`
      this.wrapper.append(card);
    }
  }
  const createCards = (arr, wrapper, num) => {
    let newArr = cards.splice(0, num);
    newArr.forEach(card => new Card(card, wrapper).render())
    cards.push(...newArr);
  }
  const getData = async url => {
    let response = await fetch(url);
    if (!response.ok) { throw new Error(`Ошибка статус ${response.status}`); }
    return await response.json();
  };
  getData('../../assets/json/pets.json')
    .then(data => data.forEach(obj => cards.push(obj)))
    .then(() => createCards(cards, slider, 3))
  const slideMove = (sideClass, num) => {
    slider.innerHTML = '';
    const width = window.getComputedStyle(sliderWrapper).width;
    parseInt(width) < 994 ? parseInt(width) < 584 ? num = 1 : num = 2 : num = 3;
    createCards(cards, slider, num)
    const slides = document.querySelectorAll('.pet')
    slides.forEach(slide => slide.classList.add(sideClass))
  }
  const createCardsFromSize = () => {
    const slides = document.querySelectorAll('.pet')
    if (slides.length == 3) return;
    createCards(cards, slider, 1);
    if (slides.length == 2) return;
    createCards(cards, slider, 1);
  }
  const slideRight = () => slideMove('slideRight')
  const slideLeft = () => slideMove('slideLeft')
  btnRight.addEventListener('click', slideRight)
  btnLeft.addEventListener('click', slideLeft)
  window.addEventListener('resize', createCardsFromSize);
}
slidesFn();