import axios from 'axios';
import { GET_USER } from './types';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
let myToken = window.localStorage.getItem('token');

async function request(endpoint, data = {}, method = 'get') {
	console.debug('API Call: ', endpoint, data, method);
	const url = `${BASE_URL}/${endpoint}`;
	const headers = { Authorization: `Bearer ${myToken}` };
	const params = method === 'get' ? data : {};
	try {
		return (await axios({ url, method, data, params, headers })).data;
	} catch (err) {
		console.error('API Error', err.response);
	}
}
function getUser(_, username, isAdmin, restaurantId, restaurantName) {
	return {
		type           : GET_USER,
		token          : myToken,
		username,
		isAdmin        : isAdmin,
		restaurantId,
		restaurantName
	};
}

export function getTokenFromAPI(username, password) {
	return async function(dispatch) {
		const data = { username, password };
		let response = await request('auth/token', data, 'post');
		// const response = await axios({
		// 	method : 'post',
		// 	url    : `${BASE_URL}/auth/token`,
		// 	data   : {
		// 		username : `${username}`,
		// 		password : `${password}`
		// 	}
		// });
		myToken = response.token;
		return dispatch(
			getUser(
				myToken,
				username,
				response.isAdmin,
				response.restaurant_id,
				response.restaurant_name
			)
		);
	};
}

export function registerUser(data) {
	return async function(dispatch) {
		let response = await request('auth/register', data, 'post');

		return dispatch(
			getUser(
				response.token,
				response.newUser.username,
				response.newUser.isAdmin,
				response.newUser.restaurant_id,
				data.restaurantName
			)
		);
	};
}

export async function getSales(begDate, endDate) {
	const restaurantId = window.localStorage.getItem('restaurantId');
	let response = await request(`sales/${begDate}/${endDate}/${restaurantId}`);

	return response;
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
		const categoryId = categories[salesArr[i][0]];
		const sales = parseInt(salesArr[i][1]);
		promises.push(
			request('sales/add', { date, categoryId, sales }, 'post')
		);
	}
	const outputSales = await Promise.all(promises);
	return outputSales;
}

export async function getSuppliers() {
	const restaurantId = window.localStorage.getItem('restaurantId');
	const res = await request(`suppliers/${restaurantId}`);

	return res;
}

export async function getSupplier(id) {
	const response = await request(`suppliers/${id}`);
	return response;
}

export async function addSupplier(data) {
	const restaurantId = window.localStorage.getItem('restaurantId');
	const response = await request(
		'suppliers/new',
		{ data, restaurantId },
		'post'
	);

	return response;
}

export async function deleteSupplier(id) {
	const response = await request(`suppliers/${id}`, {}, 'delete');
	return response;
}

export async function getSupplierProducts(id) {
	const response = await request(`products/${id}`);

	return response;
}

export async function getAllProducts() {
	const response = await request(`products/all`);
	return response.products;
}

export async function addSupplierProduct(data) {
	const response = await request('products', data, 'post');

	return response;
}

export async function deleteSupplierProduct(id) {
	const response = await request(`products/${id}`, {}, 'delete');
	return response;
}

export async function getProductsForInventory() {
	const response = await request('products/all');
	return response;
}

export async function getAllInventories(begDate, endDate) {
	const restaurant_id = window.localStorage.getItem('restaurantId');
	const response = await request(
		`inventories/all/${begDate}/${endDate}/${restaurant_id}`
	);
	return response;
}

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}
async function getPurchases(inventoryId) {
	const response = await request(`purchases/${inventoryId}`);

	const purchaseArr = Array.from(Object.values(response.purchases));

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
	const response = await request(`inventories/${id}`);
	const purchases = await getPurchases(id);
	response.inventory.Purchases = purchases.Purchases;
	return response;
}

async function addPurchasesToInventory(purchases, inventoryId) {
	const purchaseArr = Array.from(Object.entries(purchases));
	let promises = [];
	for (let i = 0; i < purchaseArr.length; i++) {
		promises.push(
			request(
				'purchases',
				{
					inventory_id : inventoryId,
					category_id  : categories[purchaseArr[i][0]],
					amount       : parseInt(purchaseArr[i][1]) || 0
				},
				'post'
			)
		);
	}
	const response = await Promise.all(promises);
	let outputObj = {
		Purchases : ''
	};
	response.map((purchase) => {
		const categoryId = purchase.purchase.category_id;
		const category = getKeyByValue(categories, categoryId);
		outputObj.Purchases = {
			...outputObj.Purchases,
			[category] : purchase.purchase
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
	const restaurant_id = window.localStorage.getItem('restaurantId');
	const invData = {
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
		token         : myToken,
		restaurant_id
	};
	const inventory = await request('inventories/add', invData, 'post');

	if (inventory.message) {
		return { message: 'Duplicate Inventory Entry' };
	}

	const invId = inventory.inventory.id;
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
	const response = await request(`inventories/${id}`, {}, 'delete');
	return response.message;
}

export async function getMenuItems() {
	const restaurantId = window.localStorage.getItem('restaurantId');
	const response = await request(`menuItems/${restaurantId}`);

	let promises = [];
	for (let i = 0; i < response.items.length; i++) {
		console.log(response.items[i])
		promises.push(
			request(`menuItems/ingredients/${response.items[i].id}`)
		);
	}

	const ingredients = await Promise.all(promises);
	console.log(ingredients)
	for (let i = 0; i < response.items.length; i++) {
		response.items[i].ingredients = ingredients[i].items;
	}
	return response;
}

export async function createMenuItem(item) {
	const restaurantId = window.localStorage.getItem('restaurantId');
	item.restaurant_id = restaurantId;
	const response = await request('menuItems/new', item, 'post');
	
	return response;
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
