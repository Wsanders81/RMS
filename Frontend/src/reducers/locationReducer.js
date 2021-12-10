import { CLOSE_DRAWER, SET_LOCATION } from '../actions/types';

export default function locationReducer(state = {}, action) {
	switch (action.type) {
		case SET_LOCATION:
			return {
				...state,
				location : action.location
			};
		case CLOSE_DRAWER:
			return {
				...state,
				open : action.open
			};
		default:
			return state;
	}
}
