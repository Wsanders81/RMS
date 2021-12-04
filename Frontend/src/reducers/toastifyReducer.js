
import {ALERT} from '../actions/types'
export default function toastifyReducer(state = {}, action) {
	switch (action.type) {
		case ALERT:
			return {
				...state,
				typeOfNotify: action.typeOfNotify,
                message: action.message
			};
		default:
			return state;
	}
}