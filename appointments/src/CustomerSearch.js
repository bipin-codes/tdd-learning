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
    <li>
      <button onClick={handleNext}>Previous</button>
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
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await global.fetch(
        `/customers${queryString}`,
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
  }, [queryString]);

  const handleNext = useCallback(async () => {
    const after = customers[customers.length - 1].id;
    const newQueryString = `?after=${after}`;
    setQueryString(newQueryString);
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
