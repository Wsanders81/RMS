import axios from 'axios';
import {
	GET_USER,
	GET_PRODUCTS,
	GET_INVENTORY,
	CREATE_PRODUCT,
	DELETE_INVENTORY
} from './types';
const BASE_URL = 'http://localhost:3001';
let myToken = window.localStorage.getItem('token');

function getUser(token, username, isAdmin) {
	console.log(isAdmin)
	return {
		type     : GET_USER,
		token,
		username,
		isAdmin : isAdmin
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
			getUser(response.data, username, response.data.isAdmin)
		);
	};
}

export function registerUser(data) {
	return async function(dispatch) {
		const response = await axios({
			method : 'post',
			url    : `${BASE_URL}/auth/register`,
			data   : {
				username  : data.username,
				password  : data.password,
				firstName : data.firstName,
				lastName  : data.lastName,
				email     : data.email
			}
		});

		return dispatch(getUser(response.data, data.username));
	};
}

export async function getSales(begDate, endDate) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/sales`,

		data   : {
			begDate : begDate,
			endDate : endDate,
			token   : myToken
		}
	});
	return response.data;
}; 
const categories = {
	Food: 1, 
	Alcohol: 2, 
	Beer: 3, 
	NABev: 4
}
export async function addSales(sales, date) {
	
	const salesArr = Array.from(Object.entries(sales))
	
	let promises = []; 
	for(let i =0; i < salesArr.length; i++){
		console.log(categories[salesArr[i][0]],parseInt(salesArr[i][1]))
		promises.push(
			axios({
				method: 'post', 
				url: `${BASE_URL}/sales/add`, 
				data: {
					date, 
					categoryId: categories[salesArr[i][0]], 
					sales: parseInt(salesArr[i][1]), 
					token: myToken
				}
			})
		)
	}
	const outputSales = await Promise.all(promises)
	console.log(outputSales)
	
	
}

export async function getSuppliers() {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/suppliers`,
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
	// console.log(response.data)
	return response.data;
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
	return response.data;
}

export async function addInventory(data, date) {
	if (
		data.Food === '' ||
		data.Alcohol === '' ||
		data.NABev === '' ||
		data.beer === '' ||
		data.sales === ''
	)
		return 'error';
	const items = data.Food.concat(data.Beer, data.Alcohol, data.NABev);
	const food_sales = data.Sales.Food;
	const alcohol_sales = data.Sales.Alcohol;
	const beer_sales = data.Sales.Beer;
	const na_bev_sales = data.Sales.NABev;

	const inventory = await axios({
		method : 'post',
		url    : `${BASE_URL}/inventories/add`,
		data   : {
			date,
			food_sales,
			alcohol_sales,
			beer_sales,
			na_bev_sales,
			items,
			token         : myToken
		}
	});
	const invId = inventory.data.inventory.id;
	const response = await getInventory(invId);

	return response;
}

export async function deleteInventory(id){
	const response = await axios({
		method: "delete", 
		url: `${BASE_URL}/inventories/${id}`,
		data: {
			token: myToken
		}
	})
	return response.data.message
}
