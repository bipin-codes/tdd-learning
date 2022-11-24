import React, { useEffect } from "react";

export const CustomerSearch = () => {
  useEffect(() => {
    const fetchData = async () =>
      await global.fetch("/customers", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
    fetchData();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  );
};
