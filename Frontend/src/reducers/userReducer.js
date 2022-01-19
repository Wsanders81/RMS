import { GET_USER, LOGOUT } from '../actions/types';
import {
	deleteUserLocalStorage,
	SetUserLocalStorage
} from '../helpers/checkLocalStorage';
export default function userReducer(state = {}, action) {
	switch (action.type) {
		case GET_USER:
			SetUserLocalStorage(
				action.username,
				action.token,
				action.isAdmin,
				action.restaurantId,
				action.restaurantName
			);
			return {
				...state,
				token          : action.token,
				user           : action.username,
				isAdmin        : action.isAdmin,
				restaurantId   : action.restaurantId,
				restaurantName : action.restaurantName
			};
		case LOGOUT:
			deleteUserLocalStorage();
			return {
				...state,
				token          : null,
				user           : null,
				restaurantId   : null,
				restaurantName : null
			};
		default:
			return state;
	}
}
