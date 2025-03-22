export function accordion() {
	const accordionBtn = document.querySelectorAll('.accordion__btn');
	accordionBtn.forEach((element) => {
		element.addEventListener('click', function (e) {
			accordionBtn.forEach((btn) => {
				if (btn !== element) {
					btn.classList.remove('accordion__btn--active');
					btn.nextElementSibling.style.display = 'none';
				}
			});
			const isActive = element.classList.toggle('accordion__btn--active');
			const content = element.nextElementSibling;
			if (isActive) {
				content.style.display = 'block';
			} else {
				content.style.display = 'none';
			}
		});
	});
}
