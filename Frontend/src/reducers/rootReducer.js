import { combineReducers } from "redux";
import userReducer from "./userReducer";
import supplierReducer from "./supplierReducer";
import toastifyReducer from './toastifyReducer'
import locationReducer from './locationReducer'
const rootReducer = combineReducers({
    userReducer, 
    supplierReducer, 
    toastifyReducer, 
    locationReducer
})

export default rootReducer; 