import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader";
import React, { useCallback, useState } from "react";
import { CustomerForm } from "./CustomerForm";
import { AppointmentFormLoader } from "./AppointmentFormLoader";
const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};
const blankAppointment = {
  service: "",
  stylist: "",
  startsAt: null,
};

export const App = () => {
  const [view, setView] = useState("dayView");
  const [customer, setCustomer] = useState();
  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);
  const transitionToAddAppointment = useCallback((customer) => {
    setCustomer(customer);
    setView("addAppointment");
  }, []);

  const transitionToDayView = useCallback(() => setView("dayView"), []);

  switch (view) {
    case "addAppointment":
      return (
        <AppointmentFormLoader
          original={{ ...blankAppointment, customer: customer.id }}
          onSave={transitionToDayView}
        />
      );
    case "addCustomer":
      return (
        <CustomerForm
          original={blankCustomer}
          onSave={transitionToAddAppointment}
        />
      );
    default:
      return (
        <>
          <menu>
            <li>
              <button type="button" onClick={transitionToAddCustomer}>
                Add customer and appointment
              </button>
            </li>
          </menu>
          <AppointmentsDayViewLoader />
        </>
      );
  }
};
