import { combineReducers } from "redux";
import userReducer from "./userReducer";
import supplierReducer from "./supplierReducer";
const rootReducer = combineReducers({
    userReducer, 
    supplierReducer
})

export default rootReducer; 