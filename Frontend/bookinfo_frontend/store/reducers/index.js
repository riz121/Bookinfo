import { combineReducers } from "redux";
import bookinfoReducer from "./bookinfo";

const rootReducer = combineReducers({
	bookinfo: bookinfoReducer,
});

export default rootReducer;
