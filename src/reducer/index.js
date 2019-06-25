import { combineReducers } from "redux";
import reducerFile from "./reducerFile";

let allReducers = combineReducers({
    data: reducerFile
});

export default allReducers;