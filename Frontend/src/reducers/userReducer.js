import { GET_USER, LOGOUT } from '../actions/types';
import { deleteUserLocalStorage, SetUserLocalStorage } from '../helpers/checkLocalStorage';
export default function userReducer(state = {}, action) {
	switch (action.type) {
		case GET_USER:
            SetUserLocalStorage(action.username, action.token.token)
			return {
				...state,
				token: action.token.token,
				user: action.username
			};
		case LOGOUT:
			deleteUserLocalStorage();
			return { ...state, token: null, user: null };
		default:
			return state;
	}
}
