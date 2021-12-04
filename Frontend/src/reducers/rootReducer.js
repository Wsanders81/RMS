import { combineReducers } from "redux";
import userReducer from "./userReducer";
import supplierReducer from "./supplierReducer";
import toastifyReducer from './toastifyReducer'
const rootReducer = combineReducers({
    userReducer, 
    supplierReducer, 
    toastifyReducer
})

export default rootReducer; 