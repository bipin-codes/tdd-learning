import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

const SearchButtons = ({ handleNext }) => (
  <menu>
    <li>
      <button onClick={handleNext}>Next</button>
    </li>
  </menu>
);

const CustomerRow = ({ customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
  </tr>
);

export const CustomerSearch = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await global.fetch(
        "/customers",
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCustomers(await result.json());
    };

    fetchData();
  }, []);

  const handleNext = useCallback(async () => {
    const after = customers[customers.length - 1].id;
    const url = `/customers?after=${after}`;
    const result = await global.fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    setCustomers(await result.json());
  }, [customers]);
  return (
    <>
      <SearchButtons
        handleNext={handleNext}
      ></SearchButtons>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, idx) => (
            <CustomerRow
              customer={customer}
              key={idx}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
