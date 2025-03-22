import { getCard, renderCatalogList } from './createCard.js';
import { sortCatalog } from './sortCard.js';

const allCheckbox = document.querySelectorAll('.custom-checkbox__field');
const checkSort = document.querySelectorAll('.custom-checkbox input');
const resetSort = document.querySelector('.catalog-form__reset');
const catalogSortSelect = document.querySelector('.catalog__sort-select');
let filterCatalog = [];

const pageItem = document.querySelectorAll('.catalog__pagination-item');
const pageContainer = document.querySelector('.catalog__pagination');
const cardsPerPage = 6; // Количество карточек на странице
let currentPage = 1 // Текущая страница
let allCards = []
let filteredCards = []

export function initFilterPagination() {
	pageItem.forEach((item, index) => {
		item.addEventListener('click', () => {
			currentPage = index + 1;
			renderFilterCurrentPage();
		});
	});
}

// Рендер пагинации
export function renderFilterCurrentPage() {
    const cardsToDisplay = (filteredCards.length ? filteredCards : allCards)
    const totalCards = cardsToDisplay.length
    const totalPages = Math.ceil(totalCards / cardsPerPage)
    const cardsFilterDisplay = cardsToDisplay.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
    if (totalPages <= 1) {
        hidePage()
    } else {
        showPage()
    }
    renderCatalogList(cardsFilterDisplay);
    updatePageItems(totalPages)
}
// Скрытия пагинации
function hidePage() {
    pageContainer.style.display = 'none'
}
// Показ пагинации
function showPage() {
   pageContainer.style.display = 'flex'
}
// Условие появления или скрытия элементов пагинации
function updatePageItems(totalPages) {
    pageItem.forEach((item, index) => {
        if (index < totalPages) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}

allCheckbox.forEach((categoryCheck) => {
	categoryCheck.addEventListener('change', () => {
		if (categoryCheck.checked) {
			filterCatalog.push(categoryCheck.value);
		} else {
			filterCatalog = filterCatalog.filter((item) => item !== categoryCheck.value);
		}
		getCard().then((result) => {
			allCards = result
			filteredCards = allCards.filter((product) => {
                return filterCatalog.length === 0 || filterCatalog.some((element) => product.type.includes(element));
            });
			currentPage = 1; // Сбрасываем текущую страницу
            renderFilterCurrentPage(); // Рендерим первую страницу с учётом фильтрации
            initFilterPagination(); // Инициализируем пагинацию
		});
	});
});

resetSort.addEventListener('click', () => {
    checkSort.forEach((checkbox) => {
        checkbox.checked = false;
    });
    filteredCards = []; // Сбрасываем отфильтрованные карточки
    currentPage = 1; // Сбрасываем текущую страницу
    getCard().then((result) => {
        allCards = result;
        renderFilterCurrentPage(); // Рендерим первую страницу с учетом всех карточек
        initFilterPagination(); // Инициализируем пагинацию
    });
});

catalogSortSelect.addEventListener('change', () => {
    const cardsToSort = filteredCards.length ? filteredCards : allCards; // Сортируем только отфильтрованные карточки
    const sortedCards = sortCatalog(cardsToSort, catalogSortSelect.value);
    filteredCards = sortedCards; // Обновляем отфильтрованные карточки
    currentPage = 1; // Сбрасываем текущую страницу
    renderFilterCurrentPage(); // Рендерим первую страницу после сортировки
});

getCard().then((result) => {
    allCards = result;
    filteredCards = allCards; // Изначально все карточки отображаются
    renderFilterCurrentPage(); // Рендерим первую страницу
    initFilterPagination(); // Инициализируем пагинацию
});