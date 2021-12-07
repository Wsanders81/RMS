import { SET_LOCATION } from '../actions/types';
import {
	deleteUserLocalStorage,
	SetUserLocalStorage
} from '../helpers/checkLocalStorage';
export default function locationReducer(state = {}, action) {
	switch (action.type) {
		case SET_LOCATION:
			return {
				...state,
				location : action.location
			};

		default:
			return state;
	}
}
