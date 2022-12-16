import { reducer } from "../../src/reducers/customer";
import {
  itMaintainsExistingState,
  itSetsStatus,
} from "../reducerGenerators";
describe("Customer Reducers", () => {
  it("returns a default state for an undefined existing state", () => {
    expect(reducer(undefined, {})).toEqual({
      customer: {},
      status: undefined,
      validationErrors: {},
      error: false,
    });
  });
});

describe("ADD_CUSTOMER_SUBMITTING action", () => {
  const action = { type: "ADD_CUSTOMER_SUBMITTING" };
  itMaintainsExistingState(reducer, action);
  itSetsStatus(reducer, action, "SUBMITTING");
});

describe("ADD_CUSTOMER_SUCCESSFUL action", () => {
  const customer = { id: 123 };
  const action = {
    type: "ADD_CUSTOMER_SUCCESSFUL",
    customer,
  };

  itSetsStatus(reducer, action, "SUCCESSFUL");
  itMaintainsExistingState(reducer, action);
  it("sets customer to provided customer", () => {
    expect(reducer(undefined, action)).toMatchObject({
      customer,
    });
  });
});

describe("ADD_CUSTOMER_FAILED action", () => {
  const action = { type: "ADD_CUSTOMER_FAILED" };
  itSetsStatus(reducer, action, "FAILED");
  itMaintainsExistingState(reducer, action);
  it("sets error to true", () => {
    expect(reducer(undefined, action)).toMatchObject({
      error: true,
    });
  });
});

describe("ADD_CUSTOMER_VALIDATION_FAILED", () => {
  const validationErrors = { field: "error text" };
  const action = {
    type: "ADD_CUSTOMER_VALIDATION_FAILED",
    validationErrors,
  };

  itSetsStatus(reducer, action, "VALIDATION_FAILED");
  itMaintainsExistingState(reducer, action);
  it("sets validation errors to provide errors", () => {
    expect(reducer(undefined, action)).toMatchObject({
      validationErrors,
    });
  });
});
