import { getCard } from './createCard.js';

export async function filtrCard() {
	const checkboxCount = document.querySelectorAll('.custom-checkbox__count');
	const productArr = await getCard();
	const newArr = productArr.reduce((acc, obj) => {
		return acc.concat(obj.type);
	}, []);
	const filPen = newArr.filter((el) => el === 'pendant');
	checkboxCount[0].textContent = filPen.length;
	const filCel = newArr.filter((el) => el === 'ceiling');
	checkboxCount[1].textContent = filCel.length;
	const filOve = newArr.filter((el) => el === 'overhead');
	checkboxCount[2].textContent = filOve.length;
	const filPoint = newArr.filter((el) => el === 'point');
	checkboxCount[3].textContent = filPoint.length;
	const filNig = newArr.filter((el) => el === 'nightlights');
	checkboxCount[4].textContent = filNig.length;
}

filtrCard();
