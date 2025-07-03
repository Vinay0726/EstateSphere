import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Import named export

import userReducer from "./State/userprofile/userReducer";
import { authReducer } from "./State/BuyerAuth/Reducer";


const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
