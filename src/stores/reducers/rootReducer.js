import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import BlogReducer from "./blogReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
const common = {
  storage,
  key: "auth",

  // stateReconciler: autoMergeLevel2,
};

const autoConfig = {
  ...common,
  whitelist: ["isLoggedIn", "token", "userData"],
};

const rootReducer = combineReducers({
  auth: persistReducer(autoConfig, authReducer),
  product: productReducer,
  blog: BlogReducer,
  user: userReducer,
  cart: cartReducer,
});
export default rootReducer;
