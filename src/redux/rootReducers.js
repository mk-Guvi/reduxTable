import { combineReducers } from "redux";
import { GlobalDataReducer } from "./reducers";

const rootReducer = combineReducers({ globalData: GlobalDataReducer });
export default rootReducer;
