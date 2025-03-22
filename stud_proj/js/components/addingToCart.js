import { getCard as originalGetCard } from './createCard.js';

const basketBtn = document.querySelector('.header__user-btn');
const basketEl = document.querySelector('.basket');
const basketCatalog = document.querySelector('.basket__list');
const basketCount = document.querySelector('.header__user-count');
const basketEmpty = document.querySelector('.basket__empty-block');
let count = 0;
let uniqueIdCounter = 0;
basketCount.textContent = count;

basketBtn.addEventListener('click', () => {
	basketEl.classList.toggle('basket--active');
});

async function getCard(productId) {
	const products = await originalGetCard(productId);
	if (products) {
		const product = products.find((item) => item.id === Number(productId));
		return product;
	}
}

export function renderBasket() {
	document.addEventListener('click', async function (e) {
		if (e.target.classList.contains('btn--icon')) {
			const productId = e.target.dataset.id;
			const product = await getCard(productId);
			const basketListItem = document.createElement('li');
			uniqueIdCounter++;
			const uniqueDataId = `${product.id}-${uniqueIdCounter}`;
			basketListItem.dataset.id = uniqueDataId;
			basketListItem.classList.add('basket__item');
			basketListItem.innerHTML = `
            <div class="basket__img">
                <img src="${product.image}" alt="Фотография товара" height="60" width="60"> <!-- Используем динамический src -->
            </div>
            <span class="basket__name">${product.name}</span> <!-- Используем динамическое имя -->
            <span class="basket__price">${product.price.new} руб</span> <!-- Используем динамическую цену -->
            <button class="basket__item-close" type="button" data-id="${uniqueDataId}">
                <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        `;
			basketCatalog.append(basketListItem);
			updateCartCount(1);
			checkBasketItem();

			const basketClose = document.querySelector(
				`.basket__item-close[data-id="${uniqueDataId}"]`
			);
			const basketItem = document.querySelector(
				`.basket__item[data-id="${uniqueDataId}"]`
			);
			basketClose.addEventListener('click', function (e) {
				basketItem.remove();
				updateCartCount(-1);
				checkBasketItem();
			});
		}
	});
}

export function checkBasketItem() {
	const basketListItem = document.querySelectorAll('.basket__item');
	const arrListItem = [...document.querySelectorAll('.basket__item')];
	if (arrListItem.length === 0) {
		basketEmpty.style.display = 'block';
	} else {
		if (basketListItem) {
			basketEmpty.style.display = 'none';
		}
	}
}

export function updateCartCount(change) {
	count += change;
	if (count < 0) {
		count = 0;
	}
	displayCartCount();
}

export function displayCartCount() {
	const basketCount = document.querySelector('.header__user-count');
	basketCount.textContent = count;
}

renderBasket();
