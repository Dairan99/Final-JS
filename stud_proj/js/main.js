import {burgerMenu} from './components/burgerMenu.js';
import {locationToggle} from './components/location.js';
import {getCard, createCard, renderCatalogList, renderCurrentPage, initPagination, toggleAll, renderDefaultList} from './components/createCard.js';
import {filtrCard} from './components/filterLuminaire.js';
import {sortCatalog} from './components/sortCard.js';
import {initFilterPagination, renderFilterCurrentPage} from './components/filterCards.js';
import {renderBasket,checkBasketItem,updateCartCount,displayCartCount} from './components/addingToCart.js';
import {accordion} from './components/accordionBtn.js';
import {createSwipeCard, funcSwiper} from './components/slider.js';
import {createValidator} from './components/validation.js';
import {sendingServer} from './components/sendingForm.js';



window.addEventListener('DOMContentLoaded', () => {
    burgerMenu()
    accordion()
    locationToggle()
    sendingServer()
});
