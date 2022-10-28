import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView.js";
import { CustomerForm } from "./CustomerForm.js";
import { sampleAppointments } from "./sampleData";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CustomerForm original={{}} onSubmit={() => {}} />);
