import React, { useState } from "react";

const Error = ({ hasError }) => {
  return <p role={"alert"}>{hasError ? "error occurred" : ""}</p>;
};

export const CustomerForm = ({ original, onSave }) => {
  const [customer, setCustomer] = useState(original);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (result.ok) {
      const customerWithId = await result.json();
      onSave(customerWithId);
    } else {
      setError(true);
    }
  };

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  const [error, setError] = useState(false);
  return (
    <form id="customer" onSubmit={handleSubmit}>
      <Error hasError={error} />
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
