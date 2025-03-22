export function burgerMenu() {
	const button = document.querySelector('.header__catalog-btn');
const closeIcon = document.querySelector('.main-menu__icon');

button.addEventListener('click', function (e) {
	const menu = document.querySelector('.main-menu');
	menu.classList.add('main-menu--active');
});

closeIcon.addEventListener('click', function (e) {
	const menuActive = document.querySelector('.main-menu--active');
	menuActive.classList.remove('main-menu--active');
});
}


