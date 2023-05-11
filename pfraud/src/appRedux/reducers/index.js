import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import VClaims from "./Claims";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  claims : VClaims
});

export default reducers;
