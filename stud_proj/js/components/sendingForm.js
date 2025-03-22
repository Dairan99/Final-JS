import { createValidator } from './validation.js';

export function sendingServer() {
	const validator = createValidator();
	const form = document.querySelector('.questions__form');
	const popUp = document.querySelector('.questions__popup');
	const popUpText = document.querySelector('.questions__popup-text');
	const popUpBtnClose = document.querySelector('.questions__popup-btn');
	const popUpTextError = document.querySelector(
		'.questions__popup-text--error'
	);
	const server = 'https://httpbin.org/post';

	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		validator.onSuccess(async function () {
			const formData = new FormData(form);

			try {
				const response = await fetch(server, {
					method: 'POST',
					body: formData,
				});

				if (response.ok) {
					popUp.style.display = 'block';
					popUpText.style.display = 'block';
					console.log(response);
				} else {
					popUp.style.display = 'block';
					popUpTextError.style.display = 'block';
				}
			} catch (error) {
				popUp.style.display = 'block';
				popUpTextError.style.display = 'block';
			}
		});
	});
	popUpBtnClose.addEventListener('click', function (e) {
		popUp.style.display = 'none';
	});
}
