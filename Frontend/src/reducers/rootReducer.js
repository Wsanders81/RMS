import { combineReducers } from 'redux';
import userReducer from './userReducer';
import supplierReducer from './supplierReducer';
import toastifyReducer from './toastifyReducer';
import locationReducer from './locationReducer';
import viewReducer from './viewReducer';
const rootReducer = combineReducers({
	userReducer,
	supplierReducer,
	toastifyReducer,
	locationReducer,
	viewReducer
});

export default rootReducer;
