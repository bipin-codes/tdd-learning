import React from "react";
const AppointmentForm = ({ original, selectableServices }) => {
  return (
    <form>
      <select name="service" value={original.service} readOnly>
        <option />
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
};
export default AppointmentForm;
