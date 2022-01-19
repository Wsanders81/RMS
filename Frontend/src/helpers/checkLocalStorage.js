import { useDispatch } from 'react-redux';
import { GET_USER } from '../actions/types';
export function CheckLocalStorage() {
	const dispatch = useDispatch();
	const user = window.localStorage.getItem('user') || null;
	const token = window.localStorage.getItem('token') || null;
	const isAdmin = window.localStorage.getItem('isAdmin') || null;
	const restaurantId = window.localStorage.getItem('restaurantId') || null;
	const restaurantName = window.localStorage.getItem('restaurantName');
	if (user && token && isAdmin)
		dispatch({
			type           : GET_USER,
			token          : token,
			username       : user,
			isAdmin        : isAdmin,
			restaurantId   : restaurantId,
			restaurantName : restaurantName
		});
}

export function SetUserLocalStorage(
	username,
	token,
	isAdmin,
	restaurantId,
	restaurantName
) {
	window.localStorage.setItem('user', username);
	window.localStorage.setItem('token', token);
	window.localStorage.setItem('isAdmin', isAdmin);
	window.localStorage.setItem('restaurantId', restaurantId);
	window.localStorage.setItem('restaurantName', restaurantName);
}

export function deleteUserLocalStorage() {
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('isAdmin');
	window.localStorage.removeItem('restaurantId');
	window.localStorage.removeItem('restaurantName');
}
