import storeEnhancer from "expect-redux/dist/storeSpy";
import { createStore, combineReducers } from "redux";
import { reducer as customerReducer } from "./reducers/customer";

export const configureStore = (
  storeEnhancer = []
) => {
  createStore(
    combineReducers({ customer: customerReducer }),
    storeEnhancer
  );
};
