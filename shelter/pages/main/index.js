
const btnBurger = document.querySelector('.hamburger')
const header = document.querySelector('.header')
const nav = document.querySelector('.header__navigation');

const closeByLink = (e) => !(e.target.closest('.navigation__link a')) || toggleMenu()
const closeByOberlay = (e) => !(e.target.classList.contains('overlay')) || toggleMenu()
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






const getData = async url => {
  let response = await fetch(url);
  if (!response.ok) { throw new Error(`Ошибка статус ${response.status}`); }
  return await response.json();
};
getData('../../assets/json/pets.json').then(response => console.log(response));