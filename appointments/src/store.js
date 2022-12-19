import createSagaMiddleware from "@redux-saga/core";
import storeEnhancer from "expect-redux/dist/storeSpy";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { takeLatest } from "redux-saga/effects";
import { reducer as customerReducer } from "./reducers/customer";
import { addCustomer } from "./sagas/customer";

function* rootSaga() {
  yield takeLatest(
    "ADD_CUSTOMER_REQUEST",
    addCustomer
  );
}

export const configureStore = (
  storeEnhancer = []
) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ customer: customerReducer }),
    compose(
      applyMiddleware(sagaMiddleware),
      ...storeEnhancer
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
