import React from "react";

import {
  initializeReactContainer,
  render,
  form,
  field,
  click,
  submit,
  submitButton,
  change,
  labelFor,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

const spy = () => {
  let receivedArguments;
  return {
    fn: (...arg) => (receivedArguments = arg),
    receivedArgument: (n) => receivedArguments[n],
    receivedArguments: () => receivedArguments,
  };
};

describe("CustomerForm", () => {
  const originalFetch = global.fetch;
  let fetchSpy;
  let blankCustomer = { firstName: "", lastName: "", phoneNumber: "" };

  const bodyOfLastFetchRequest = () =>
    JSON.parse(fetchSpy.receivedArgument(1).body);

  beforeEach(() => {
    initializeReactContainer();
    fetchSpy = spy();
    global.fetch = fetchSpy.fn;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) => {
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field(fieldName)).toBeInputFieldOfType("text");
    });
  };
  const itIncludesTheExistingValue = (fieldName, existingValue) => {
    it("includes existing value", () => {
      const customer = { [fieldName]: existingValue };
      render(<CustomerForm original={customer} />);

      expect(field(fieldName).value).toEqual(existingValue);
    });
  };
  const itRendersLabel = (fieldName, text) => {
    it("renders a label", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(labelFor(fieldName)).not.toBeNull();
    });
    it(`renders '${text}' label content`, () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(labelFor(fieldName)).toContainText(text);
    });
  };
  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it("assigns an id that matches the label id ", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };
  // const itSubmitsExistingValue = (fieldName, value) => {
  //   it("saves existing value when submitted", () => {
  //     expect.hasAssertions();
  //     const customer = { [fieldName]: value };
  //     render(
  //       <CustomerForm
  //         original={customer}
  //         onSubmit={(props) => {
  //           expect(props[fieldName]).toEqual(value);
  //         }}
  //       />
  //     );
  //     click(submitButton());
  //   });
  // };
  const itSubmitsExistingValue = (fieldName, value) => {
    it("saves existing value when submitted", () => {
      const customer = { [fieldName]: value };

      render(<CustomerForm original={customer} />);
      click(submitButton());
      // expect(fetchSpy).toBeCalledWith(
      //   expect.anything(),
      //   expect.objectContaining({
      //     body: JSON.stringify(customer),
      //   })
      // );
      expect(bodyOfLastFetchRequest()).toMatchObject(customer);
    });
  };

  const itSavesANewValueWhenSubmitted = (fieldName, value) => {
    it("saves new value when submitted", () => {
      render(<CustomerForm original={blankCustomer} />);

      change(field(fieldName), value);
      click(submitButton());
      // expect(fetchSpy).toBeCalledWith(
      //   expect.anything(),
      //   expect.objectContaining({
      //     body: JSON.stringify({
      //       ...blankCustomer,
      //       [fieldName]: value,
      //     }),
      //   })
      // );
      expect(bodyOfLastFetchRequest()).toMatchObject({ [fieldName]: value });
    });
  };

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersLabel("firstName", "First name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "Ashley");
    itSavesANewValueWhenSubmitted("firstName", "Jamie");
  });
  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "white");
    itRendersLabel("lastName", "Last name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("lastName", "white");
    itSavesANewValueWhenSubmitted("lastName", "black");
  });
  describe("phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "1234");
    itRendersLabel("phoneNumber", "Phone number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "1234");
    itSavesANewValueWhenSubmitted("phoneNumber", "5678");
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} />);
    const event = submit(form());
    expect(event.defaultPrevented).toBe(true);
  });
  it("sends request to post/customers when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} />);
    click(submitButton());
    expect(fetchSpy).toBeCalledWith(
      "/customers",
      expect.objectContaining({ method: "POST" })
    );
  });
  it("calls fetch with the right configuration", () => {
    render(<CustomerForm original={blankCustomer} />);
    click(submitButton());
    expect(fetchSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });
});
