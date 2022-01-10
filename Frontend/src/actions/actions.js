import axios from 'axios';
import { GET_USER } from './types';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
let myToken = window.localStorage.getItem('token');
function getUser(token, username, isAdmin, restaurantId, restaurantName) {
	return {
		type           : GET_USER,
		token,
		username,
		isAdmin        : isAdmin,
		restaurantId,
		restaurantName
	};
}

export function getTokenFromAPI(username, password) {
	return async function(dispatch) {
		const response = await axios({
			method : 'post',
			url    : `${BASE_URL}/auth/token`,
			data   : {
				username : `${username}`,
				password : `${password}`
			}
		});
		return dispatch(
			getUser(
				response.data,
				username,
				response.data.isAdmin,
				response.data.restaurant_id,
				response.data.restaurant_name
			)
		);
	};
}

export function registerUser(data) {
	return async function(dispatch) {
		const response = await axios({
			method : 'post',
			url    : `${BASE_URL}/auth/register`,
			data   : {
				username       : data.username,
				password       : data.password,
				firstName      : data.firstName,
				lastName       : data.lastName,
				email          : data.email,
				restaurantName : data.restaurantName
			}
		});

		return dispatch(
			getUser(
				response.data,
				response.data.newUser.username,
				response.data.newUser.isAdmin,
				response.data.newUser.restaurant_id,
				data.restaurantName
			)
		);
	};
}

export async function getSales(begDate, endDate) {
	const restaurantId = window.localStorage.getItem('restaurantId');
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/sales`,

		data   : {
			begDate      : begDate,
			endDate      : endDate,
			token        : myToken,
			restaurantId
		}
	});
	return response.data;
}
const categories = {
	Food    : 1,
	Alcohol : 2,
	Beer    : 3,
	NABev   : 4
};
export async function addSales(sales, date) {
	sales.Food = sales.Food === '' ? (sales.Food = 0) : sales.Food;
	sales.Alcohol = sales.Alcohol === '' ? (sales.Alcohol = 0) : sales.Alcohol;
	sales.Beer = sales.Beer === '' ? (sales.Beer = 0) : sales.Beer;
	sales.NABev = sales.NABev === '' ? (sales.NABev = 0) : sales.NABev;

	const salesArr = Array.from(Object.entries(sales));
	let promises = [];
	for (let i = 0; i < salesArr.length; i++) {
		promises.push(
			axios({
				method : 'post',
				url    : `${BASE_URL}/sales/add`,
				data   : {
					date,
					categoryId : categories[salesArr[i][0]],
					sales      : parseInt(salesArr[i][1]),
					token      : myToken
				}
			})
		);
	}
	const outputSales = await Promise.all(promises);

	return outputSales;
}

export async function getSuppliers() {
	const restaurantId = window.localStorage.getItem('restaurantId');
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/suppliers`,
		data   : {
			token        : myToken,
			restaurantId
		}
	});
	return response.data;
}

export async function getSupplier(id) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/suppliers/${id}`,
		data   : {
			token : myToken
		}
	});
	return response.data;
}

export async function addSupplier(data) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/suppliers/new`,
		data   : {
			data,
			token : myToken
		}
	});

	return response.data;
}

export async function deleteSupplier(id) {
	const response = await axios({
		method : 'delete',
		url    : `${BASE_URL}/suppliers/${id}`,
		data   : {
			token : myToken
		}
	});
	return response.data;
}

export async function getSupplierProducts(id) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/products/${id}`,
		data   : {
			token : myToken,
			id    : id
		}
	});
	return response.data;
}

export async function getAllProducts() {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/products/all`,
		data   : {
			token : myToken
		}
	});
	return response.data.products;
}

export async function addSupplierProduct(data) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/products`,
		data   : {
			token : myToken,
			data
		}
	});
	return response.data;
}

export async function deleteSupplierProduct(id) {
	const res = await axios({
		method : 'delete',
		url    : `${BASE_URL}/products/${id}`,
		data   : {
			token : myToken
		}
	});
	return res.data;
}

export async function getProductsForInventory() {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/products/all`,
		data   : {
			token : myToken
		}
	});
	return response.data;
}

export async function getAllInventories(begDate, endDate) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/inventories/all`,
		data   : {
			begDate,
			endDate,
			token   : myToken
		}
	});

	return response.data;
}

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}
async function getPurchases(inventoryId) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/purchases/${inventoryId}`,
		data   : {
			token : myToken
		}
	});
	const purchaseArr = Array.from(Object.values(response.data.purchases));

	let outputObj = {
		Purchases : ''
	};
	purchaseArr.map((purchase) => {
		const categoryId = purchase.category_id;
		const category = getKeyByValue(categories, categoryId);
		outputObj.Purchases = {
			...outputObj.Purchases,
			[category] : purchase
		};
		return purchase;
	});

	return outputObj;
}

export async function getInventory(id) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/inventories`,
		data   : {
			id,
			token : myToken
		}
	});
	const purchases = await getPurchases(id);
	response.data.inventory.Purchases = purchases.Purchases;
	return response.data;
}

async function addPurchasesToInventory(purchases, inventoryId) {
	const purchaseArr = Array.from(Object.entries(purchases));
	let promises = [];
	for (let i = 0; i < purchaseArr.length; i++) {
		promises.push(
			axios({
				method : 'post',
				url    : `${BASE_URL}/purchases`,
				data   : {
					token        : myToken,
					inventory_id : inventoryId,
					category_id  : categories[purchaseArr[i][0]],
					amount       : parseInt(purchaseArr[i][1]) || 0
				}
			})
		);
	}
	const response = await Promise.all(promises);
	let outputObj = {
		Purchases : ''
	};
	response.map((purchase) => {
		const categoryId = purchase.data.purchase.category_id;
		const category = getKeyByValue(categories, categoryId);
		outputObj.Purchases = {
			...outputObj.Purchases,
			[category] : purchase.data.purchase
		};
		return purchase;
	});
	return outputObj;
}

export async function addInventory(data, date) {
	if (
		data.Food === '' ||
		data.Alcohol === '' ||
		data.NABev === '' ||
		data.beer === '' ||
		data.sales === '' ||
		data.Purchases.Food === '' ||
		data.BegInv.Food === ''
	)
		return 'error';
	const items = data.Food.concat(data.Beer, data.Alcohol, data.NABev);

	const food_sales = data.Sales.Food || 0;
	const alcohol_sales = data.Sales.Alcohol || 0;
	const beer_sales = data.Sales.Beer || 0;
	const na_bev_sales = data.Sales.NABev || 0;
	const inventoryPurchases = data.Purchases;
	const beg_food = data.BegInv.Food || 0;
	const beg_alcohol = data.BegInv.Alcohol || 0;
	const beg_beer = data.BegInv.Beer || 0;
	const beg_na_bev = data.BegInv.NABev || 0;
	const inventory = await axios({
		method : 'post',
		url    : `${BASE_URL}/inventories/add`,
		data   : {
			date,
			food_sales,
			alcohol_sales,
			beer_sales,
			na_bev_sales,
			beg_food,
			beg_alcohol,
			beg_beer,
			beg_na_bev,
			items,
			token         : myToken
		}
	});
	if (inventory.data.message) {
		return { message: 'Duplicate Inventory Entry' };
	}
	const invId = inventory.data.inventory.id;
	const response = await getInventory(invId);

	const inventoryId = response.inventory.id;
	const purchases = await addPurchasesToInventory(
		inventoryPurchases,
		inventoryId
	);
	response.inventory.Purchases = purchases.Purchases;
	return response;
}

export async function deleteInventory(id) {
	const response = await axios({
		method : 'delete',
		url    : `${BASE_URL}/inventories/${id}`,
		data   : {
			token : myToken
		}
	});
	return response.data.message;
}

export async function getMenuItems() {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/menuItems`,
		data   : {
			token : myToken
		}
	});
	let promises = [];
	for (let i = 0; i < response.data.items.length; i++) {
		promises.push(
			axios({
				method : 'post',
				url    : `${BASE_URL}/menuItems/ingredients`,
				data   : {
					token : myToken,
					id    : response.data.items[i].id
				}
			})
		);
	}
	const ingredients = await Promise.all(promises);

	for (let i = 0; i < response.data.items.length; i++) {
		response.data.items[i].ingredients = ingredients[i].data.items;
	}
	return response.data;
}

export async function createMenuItem(item) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/menuItems/new`,
		data   : {
			token : myToken,
			item  : item
		}
	});
	return response.data;
}

export async function deleteMenuItem(id) {
	const response = await axios({
		method : 'delete',
		url    : `${BASE_URL}/menuItems/${id}`,
		data   : {
			token : myToken
		}
	});
	return response.data;
}
