import React, { useState } from "react";

const Error = ({ hasError }) => (
  <p role="alert">{hasError ? "An error occurred during save." : ""}</p>
);

const required = (description) => (value) =>
  !value || value.trim() === "" ? description : undefined;

export const CustomerForm = ({ original, onSave }) => {
  const [error, setError] = useState(false);

  const [customer, setCustomer] = useState(original);
  const [validationErrors, setValidationErrors] = useState({});

  const handleBlur = ({ target }) => {
    const validators = {
      firstName: required("First name is required"),
      lastName: required("Last name is required"),
      phoneNumber: required("Phone number is required"),
    };
    const result = validators[target.name](target.value);
    setValidationErrors({ ...validationErrors, [target.name]: result });
  };
  const handleChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await global.fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (result.ok) {
      setError(false);
      const customerWithId = await result.json();
      onSave(customerWithId);
    } else {
      setError(true);
    }
  };

  const hasError = (fieldName) => validationErrors[fieldName] !== undefined;
  const renderError = (fieldName) => (
    <span id={`${fieldName}Error`} role={"alert"}>
      {hasError(fieldName) ? validationErrors[fieldName] : ""}
    </span>
  );
  return (
    <form onSubmit={handleSubmit}>
      <Error hasError={error} />
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChange}
        aria-describedby="firstNameError"
        onBlur={handleBlur}
      />
      {renderError("firstName")}

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        aria-describedby="lastNameError"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {renderError("lastName")}

      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
        aria-describedby="phoneNumberError"
        onBlur={handleBlur}
      />
      {renderError("phoneNumber")}

      <input type="submit" value="Add" />
    </form>
  );
};
