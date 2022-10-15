import React, { useState } from "react";
export const Appointment = ({
  customer,
  stylist,
  service,
  notes,
  startsAt,
}) => {
  const readableTime = (time) => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
  };

  return (
    <div id="appointmentView">
      <table>
        <h3>{`Today's appointment at ${readableTime(startsAt)}`}</h3>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {customer.firstName} {customer.lastName}
            </td>

            <td>Phone number</td>
            <td>{customer.phone}</td>

            <td>Stylist</td>
            <td>{stylist}</td>

            <td>Service</td>
            <td>{service}</td>

            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AppointmentsDayView = ({ appointments }) => {
  const appointmentTime = (startsAt) => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
  };

  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTime(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
