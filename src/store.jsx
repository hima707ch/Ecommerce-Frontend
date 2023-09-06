import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productDetailsReducer,
  productReducer
} from "./reducer/productReducer";

import { userReducer, profileReducer } from "./reducer/userReducer";

const reducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: productReducer
});

const initialState = {};

const midilware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...midilware))
);

export default store;
