import { storeSpy, expectRedux } from "expect-redux";
import { isType } from "graphql";

import { configureStore } from "../../src/store";

describe("addCustomer", () => {
  let store;
  beforeEach(() => {
    store = configureStore([storeSpy]);
  });
  const addCustomerRequest = (customer) => ({
    type: "ADD_CUSTOMER_REQUEST",
    customer,
  });

  it("sets current status to submitting", () => {
    store.dispatch(addCustomerRequest());
    //since our expectation is async, we can return the test instead of making test function async and then testing after await
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: "ADD_CUSTOMER_SUBMITTING" });
  });
});
