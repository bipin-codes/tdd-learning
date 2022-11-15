import React from "react";
import {
  element,
  initializeReactContainer,
  render,
  click,
} from "./reactTestExtensions";

import { App } from "../src/App";
import { CustomerForm } from "../src/CustomerForm";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { blankCustomer } from "./builders/customer";

jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader"></div>
  )),
}));

jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm"></div>),
}));

const beginAddingCustomerAndAppointment = () =>
  click(element("menu>li>button:first-of-type"));
describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });
  it("initially sows the AppointmentDayViewLoader", () => {
    render(<App></App>);
    expect(AppointmentsDayViewLoader).toBeRendered();
  });
  it("has a menu bar", () => {
    render(<App />);
    expect(element("menu")).not.toBeNull();
  });
  it("has a button to initiate add customer and apointment action", () => {
    render(<App />);
    const firstButton = element("menu > li > button:first-of-type");
    expect(firstButton).toContainText("Add customer and appointment");
  });
  it("displays the Customer form when button is clicked", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("#CustomerForm")).not.toBeNull();
  });
  it("passed a blank original customer object to CustomerForm", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(CustomerForm).toBeRenderedWithProps(
      expect.objectContaining({ original: blankCustomer })
    );
  });
  it("hides the AppointmentDayViewLoader when button is clicked", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("#AppointmentsDayViewLoader")).toBeNull();
  });
  it("hides the button bar when customer form is beign displayed", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("menu")).toBeNull();
  });
});
