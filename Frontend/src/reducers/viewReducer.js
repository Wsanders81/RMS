import { START_NEW_INVENTORY } from '../actions/types';

const DEFAULT_STATE = {
	showInvForm    : false,
	showInvButtons : true
};
export default function viewReducer(
	state = {
		showInvForm    : false,
		showInvButtons : true
	},
	action
) {
	switch (action.type) {
		case START_NEW_INVENTORY:
			return {
				...state,
				showInvForm    : true,
				showInvButtons : false
			};
		default:
			return state;
	}
}
