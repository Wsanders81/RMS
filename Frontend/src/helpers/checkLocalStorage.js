import { useDispatch } from 'react-redux';
import { GET_USER } from '../actions/types';
export function CheckLocalStorage() {
	const dispatch = useDispatch();
	const user = window.localStorage.getItem('user') || null;
	const token = window.localStorage.getItem('token') || null;
	if (user && token)
		dispatch({ type: GET_USER, token:{token: token}, username: user });
}

export function SetUserLocalStorage(username, token) {
    window.localStorage.setItem("user", username)
    window.localStorage.setItem("token", token)

}

export function deleteUserLocalStorage() {

	window.localStorage.removeItem('user');
	window.localStorage.removeItem('token');

}
