import React from "react";
export const CustomerForm = ({ original }) => {
  const { firstName } = original;
  return (
    <form>
      <label htmlFor="firstName">First name</label>
      <input
        readOnly
        type={"text"}
        id={"firstName"}
        name="firstName"
        value={firstName}
      />
    </form>
  );
};
