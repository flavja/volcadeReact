import {combineReducers} from "redux";
import volcanoReducer from './volcanoReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import waterfallReducer from "./waterfallReducer";

export default combineReducers({
    volc: volcanoReducer,
    waterf: waterfallReducer,
    error: errorReducer,
    auth: authReducer
})
