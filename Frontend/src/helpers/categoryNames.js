
export const returnCategoryName = (array) => {
	let nameArray = [];
	for (let name of array) {
		const formattedName = name.replace('Sales', '');
		const capitalizedName =
			formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
		nameArray.push(capitalizedName);
	}
	return nameArray;
};
