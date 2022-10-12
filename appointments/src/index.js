import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./Appointment.jsx";

import { sampleAppointments } from "./sampleData";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppointmentsDayView appointments={sampleAppointments} />);
