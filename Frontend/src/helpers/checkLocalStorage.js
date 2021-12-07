import { useDispatch } from 'react-redux';
import { GET_USER } from '../actions/types';
export function CheckLocalStorage() {
	const dispatch = useDispatch();
	const user = window.localStorage.getItem('user') || null;
	const token = window.localStorage.getItem('token') || null;
	const isAdmin = window.localStorage.getItem('isAdmin') || null;
	if (user && token && isAdmin)
		dispatch({
			type: GET_USER,
			token: { token: token },
			username: user,
			isAdmin: isAdmin
		});
}

export function SetUserLocalStorage(username, token, isAdmin) {
	window.localStorage.setItem('user', username);
	window.localStorage.setItem('token', token);
	window.localStorage.setItem('isAdmin', isAdmin);
}

export function deleteUserLocalStorage() {
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('isAdmin');
}
