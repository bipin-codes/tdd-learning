import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader";
import React, { useCallback, useState } from "react";
import { CustomerForm } from "./CustomerForm";
const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};
export const App = () => {
  const [view, setView] = useState("dayView");

  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);

  return (
    <>
      {view === "addCustomer" ? (
        <CustomerForm original={blankCustomer} />
      ) : (
        <>
          <menu>
            <li>
              <button onClick={transitionToAddCustomer} type="button">
                Add customer and appointment
              </button>
            </li>
          </menu>
          <AppointmentsDayViewLoader />
        </>
      )}
    </>
  );
};
