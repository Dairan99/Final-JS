export function locationToggle() {
	const location = document.querySelector('.location__city');
	const cityName = document.querySelector('.location__city-name');
	const cityItem = document.querySelectorAll('.location__sublink');
	const arrCity = [...cityItem];

	location.addEventListener('click', () => {
		location.classList.toggle('location__city--active');
	});
	
	for (const city of arrCity) {
		city.addEventListener('click', function (e) {
			cityName.textContent = city.textContent;
			location.classList.remove('location__city--active');
		});
	}
}

