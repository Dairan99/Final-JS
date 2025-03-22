const catalog = document.querySelector('.catalog__list');
const toggleEl = document.querySelectorAll('.custom-radio__field');
const catalogList = document.querySelector('.catalog__list');
const pageItem = document.querySelectorAll('.catalog__pagination-item');
const cardsPerPage = 6; // Количество карточек на странице
let currentPage = 1; // Текущая страница
let allCards = []; // Все карточки

// Получаем данные с сервера
export async function getCard() {
	let responce = await fetch('./data/data.json');
	let cards = await responce.json();
	return cards;
}

// Создаём карточки
export function createCard(product) {
	const catalogListItem = document.createElement('li');
	catalogListItem.classList.add('catalog__item');
	catalogListItem.dataset.id = product.id;
	catalogListItem.innerHTML = `
    <div class="product-card">
      <div class="product-card__visual">
        <img class="product-card__img" src="${product.image}" height="436" width="290"
          alt="Изображение товара">
        <div class="product-card__more">
          <a href="#" class="product-card__link btn btn--icon" data-id="${product.id}" >
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
          </a>
          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>
      <div class="product-card__info">
        <h2 class="product-card__title">${product.name}</h2>
        <span class="product-card__old">
          <span class="product-card__old-number">${product.price.old}</span>
          <span class="product-card__old-add">₽</span>
        </span>
        <span class="product-card__price">
          <span class="product-card__price-number">${product.price.new}</span>
          <span class="product-card__price-add">₽</span>
        </span>
        <div class="product-card__tooltip tooltip">
          <button class="tooltip__btn" aria-label="Показать подсказку">
            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-i"></use>
            </svg>
          </button>
          <div class="tooltip__content">
            <span class="tooltip__text">Наличие товара по городам:</span>
            <ul class="tooltip__list">
              <li class="tooltip__item">
                <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
              </li>
              <li class="tooltip__item">
                <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
              </li>
              <li class="tooltip__item">
                <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
	return catalogListItem;
}

// Выводим карточки на экран
export function renderCatalogList(arrProduct) {
	catalogList.innerHTML = '';
	arrProduct.forEach((product) => {
		catalogList.append(createCard(product));
	});
}

// Список по умолчанию
export function renderDefaultList() {
	getCard().then((result) => {
		renderCatalogList(result);
	});
}

// Инит пагинации
export function initPagination() {
	pageItem.forEach((item, index) => {
		item.addEventListener('click', () => {
			currentPage = index + 1;
			renderCurrentPage();
		});
	});
}

// Рендер пагинации
export function renderCurrentPage() {
	const start = (currentPage - 1) * cardsPerPage;
	const end = start + cardsPerPage;
	const cardsToDisplay = allCards.slice(start, end);
	renderCatalogList(cardsToDisplay);
}

// Кнопка "в наличии" и "всё"
export async function toggleAll() {
	const arr = await getCard();
	const newArr = arr.filter((product) =>
		Object.values(product.availability).some((quantity) => quantity > 0)
	);
	const divEl = document.querySelectorAll('.catalog__list');
	divEl.forEach((el) => {
		el.innerHTML = '';
	});
	newArr.forEach((product) => {
		catalog.append(createCard(product));
	});
}

// Всё
toggleEl[0].addEventListener('click', toggleAll);
// В наличии
toggleEl[1].addEventListener('click', renderDefaultList);

// Рендер карточек с пагинациией
getCard().then((result) => {
	allCards = result;
	renderCurrentPage();
	initPagination();
});
