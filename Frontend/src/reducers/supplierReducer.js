import { GET_SUPPLIERS } from "../actions/types";
export default function supplierReducer(state = {}, action) {
	switch (action.type) {
		case GET_SUPPLIERS:
			return {
				...state,
				[action.supplier.id] : action.supplier
			};
		default:
			return state;
	}
}