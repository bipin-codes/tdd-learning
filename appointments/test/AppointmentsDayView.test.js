import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

describe("Appointment", () => {
  let container;
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const appointmentTable = () =>
    document.querySelector("#appointmentView > table");
  it("renders a table", () => {
    render(<Appointment customer={{ firstName: "Ashley" }} />);
    expect(appointmentTable()).not.toBeNull();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toContain("Jordan");
  });
  it("renders last name of the customer", () => {
    const customer = { lastName: "White" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toContain("White");
  });
  it("renders another last name of the customer", () => {
    const customer = { lastName: "Jones" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toContain("Jones");
  });
  it("renders customer phone number", () => {
    const customer = { phone: "123123123" };
    render(<Appointment customer={customer}></Appointment>);
    expect(appointmentTable().textContent).toContain("123123123");
  });
  it("renders another customer phone number", () => {
    const customer = { phone: "1231231234" };
    render(<Appointment customer={customer}></Appointment>);
    expect(appointmentTable().textContent).toContain("1231231234");
  });
  it("renders customer's stylist name", () => {
    render(
      <Appointment customer={blankCustomer} stylist={"Mike"}></Appointment>
    );
    expect(appointmentTable().textContent).toContain("Mike");
  });
  it("renders another customer's stylist name", () => {
    render(
      <Appointment customer={blankCustomer} stylist={"Duke"}></Appointment>
    );
    expect(appointmentTable().textContent).toContain("Duke");
  });
  it("renders Salon Service", () => {
    render(<Appointment customer={blankCustomer} service="Cut"></Appointment>);
    expect(appointmentTable().textContent).toContain("Cut");
  });
  it("renders Salon Service", () => {
    render(
      <Appointment customer={blankCustomer} service="BlowDry"></Appointment>
    );
    expect(appointmentTable().textContent).toContain("BlowDry");
  });

  it("renders appointment's  Salon Notes", () => {
    render(<Appointment notes="Yep" customer={blankCustomer}></Appointment>);
    expect(appointmentTable().textContent).toContain("Yep");
  });
  it("renders another appointment's Salon Notes", () => {
    render(<Appointment notes="XYZ" customer={blankCustomer}></Appointment>);
    expect(appointmentTable().textContent).toContain("XYZ");
  });
  it("renders appointment heading", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(document.querySelector("h3")).not.toBeNull();
  });
  it("renders appointment time as a header", () => {
    const today = new Date();
    const timestamp = today.setHours(9, 0, 0);
    render(<Appointment customer={blankCustomer} startsAt={timestamp} />);
    expect(document.querySelector("h3").textContent).toEqual(
      "Today's appointment at 09:00"
    );
  });
});

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments}></AppointmentsDayView>
    );

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");

    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]}></AppointmentsDayView>);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today"
    );
  });

  it("Selects the first appoinment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Ashley");
  });
  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });
});
