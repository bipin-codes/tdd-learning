import React from "react";
import {
  initializeReactContainer,
  render,
  element,
} from "./reactTestExtensions";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { AppointmentsDayView } from "../src/AppointmentsDayView";
jest.mock("../src/AppointmentsDayView", () => ({
  AppointmentsDayView: jest.fn(() => <div id="AppointmentsDayView" />),
}));

describe("AppointmentsDayViewLoader", () => {
  beforeEach(() => {
    initializeReactContainer();
  });
  it("renders an AppointmentsDayView", async () => {
    render(<AppointmentsDayViewLoader />);
    expect(element("#AppointmentsDayView")).not.toBeNull();
  });
  it("initially passed empty array of appointments to AppointmentsDayView", () => {
    render(<AppointmentsDayView />);
    expect(AppointmentsDayView).toBeCalledWith(
      { appointments: [] },
      expect.anything()
    );
  });
});
