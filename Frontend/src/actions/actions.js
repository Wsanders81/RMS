import axios from 'axios';
import {
	GET_USER,
	GET_PRODUCTS,
	GET_INVENTORY,
	CREATE_PRODUCT,
	DELETE_INVENTORY,
	LOGOUT
} from './types';
import { useSelector } from 'react-redux';
import { ConstructionSharp } from '@mui/icons-material';
import moment from 'moment';
const BASE_URL = 'http://localhost:3001';
let myToken = window.localStorage.getItem('token');

function getUser(token, username) {
	
	return {
		type     : GET_USER,
		token,
		username
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
        
		return dispatch(getUser(response.data, username));
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

export async function getSales(token, begDate, endDate) {
	const response = await axios({
		method : 'post',
		url    : `${BASE_URL}/sales`,

		data   : {
			begDate : begDate,
			endDate : endDate,
			token   : token
		}
	});
	return response.data;
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

export async function getProductsForInventory(){
	const response = await axios({
		method: "post", 
		url: `${BASE_URL}/products/all`, 
		data: {
			token: myToken
		}
	})
	return response.data
}

export async function getAllInventories(begDate, endDate){
	const response = await axios({
		method : "post", 
		url: `${BASE_URL}/inventories/all`, 
		data: {
			begDate, 
			endDate, 
			token: myToken
		}
	})
	// console.log(response.data)
	return response.data
}

export async function getInventory(id) {
	const response = await axios({
		method: "post", 
		url: `${BASE_URL}/inventories`, 
		data: {
			id, 
			token: myToken
		}
	})
	return response.data
}



export async function addInventory(data) {
	if(data.Food === "" || data.Alcohol === "") return 'error'
	const items = data.Food.concat(data.Beer, data.Alcohol, data.NABev)
	const food_sales = data.Sales.Food
	const alcohol_sales = data.Sales.Alcohol
	const beer_sales = data.Sales.Beer
	const na_bev_sales = data.Sales.NABev
	const date = moment(new Date()).format("YYYY-MM-DD")
	
	
	const response = await axios({
		method: "post", 
		url: `${BASE_URL}/inventories/add`, 
		data: {
			date,
			food_sales, 
			alcohol_sales, 
			beer_sales, 
			na_bev_sales,
			items, 
			token: myToken
		}
	})
	return response.data
}