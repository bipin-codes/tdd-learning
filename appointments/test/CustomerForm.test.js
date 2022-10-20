import React from "react";

import {
  initializeReactContainer,
  render,
  element,
  form,
  field,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  let blankCustomer = {};
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });
  it("renders the first name field as a text box", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(field("firstName")).not.toBeNull();
    expect(field("firstName").tagName).toEqual("INPUT");
    expect(field("firstName").type).toEqual("text");
  });
  it("includes existing value for the first name", () => {
    const customer = { firstName: "Ashley" };
    render(<CustomerForm original={customer} />);

    expect(field("firstName").value).toEqual("Ashley");
  });
  it("renders a label for the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).not.toBeNull();
  });

  it("renders 'first name' as the first name label content", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).toContainText("First name");
  });
  it("assigns an id that matches the label id to the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(field("firstName").id).toEqual("firstName");
  });
});