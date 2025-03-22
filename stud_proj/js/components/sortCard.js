export function sortCatalog(array, value) {
	if (value === 'rating-max') {
		const newArrey = array.sort((a, b) => b.rating - a.rating);
		return newArrey;
	} else if (value === 'price-max') {
		const newArrey = array.sort((a, b) => b.price.new - a.price.new);
		return newArrey;
	} else if (value === 'price-min') {
		const newArrey = array.sort((a, b) => a.price.new - b.price.new);
		return newArrey;
	}
}
