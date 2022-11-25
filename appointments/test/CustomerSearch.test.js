import React from "react";
import {
  renderAndWait,
  textOf,
  initializeReactContainer,
  elements,
  buttonWithLabel,
  clickAndWait,
} from "./reactTestExtensions";
import { fetchResponseOk } from "./builders/fetch";
import { CustomerSearch } from "../src/CustomerSearch";

const oneCustomer = [
  {
    id: 1,
    firstName: "A",
    lastName: "B",
    phoneNumber: "1",
  },
];
const twoCustomers = [
  {
    id: 1,
    firstName: "A",
    lastName: "B",
    phoneNumber: "1",
  },
  {
    id: 2,
    firstName: "C",
    lastName: "D",
    phoneNumber: "2",
  },
];

const tenCustomers = Array.from(
  "0123456789",
  (id) => ({ id })
);
describe("CustomerSearch", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk([]));
  });
  it("renders a table with four headings", async () => {
    await renderAndWait(<CustomerSearch />);
    const headings = elements("table th");
    expect(textOf(headings)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ]);
  });
  it("fetches all customer data when component mounts", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(global.fetch).toBeCalledWith(
      "/customers",
      {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
  it("renders all customer data in a table row", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(<CustomerSearch />);
    const columns = elements(
      "table > tbody > tr > td"
    );
    expect(columns[0]).toContainText("A");
    expect(columns[1]).toContainText("B");
    expect(columns[2]).toContainText("1");
  });
  it("renders multiple customers row", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(twoCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    const rows = elements("table tbody tr");
    expect(rows[1].childNodes[0]).toContainText("C");
  });

  it("has a next button", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(buttonWithLabel("Next")).not.toBeNull();
  });
  it("requests next page of data when next button is clicked", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers?after=9",
      expect.anything()
    );
  });
  it("displays next page of data when the next button is clicked", async () => {
    const nextCustomer = [
      { id: "next", firstName: "Next" },
    ];
    global.fetch
      .mockResolvedValueOnce(
        fetchResponseOk(tenCustomers)
      )
      .mockResolvedValue(
        fetchResponseOk(nextCustomer)
      );
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    expect(elements("tbody tr")).toHaveLength(1);
    expect(elements("td")[0]).toContainText("Next");
  });
});
