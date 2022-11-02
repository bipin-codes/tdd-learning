import React, { useState } from "react";

export const CustomerForm = ({ original }) => {
  const [customer, setCustomer] = useState(original);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
  };

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  return (
    <form id="customer" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type={"text"}
        id={"firstName"}
        name="firstName"
        value={customer.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type={"text"}
        id={"lastName"}
        name="lastName"
        value={customer.lastName}
        onChange={handleChange}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type={"text"}
        id={"phoneNumber"}
        name="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
      />
      <input type="submit" value={"Add"} />
    </form>
  );
};
