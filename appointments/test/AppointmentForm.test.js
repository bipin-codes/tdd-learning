import React from "react";
import {
  initializeReactContainer,
  render,
  field,
  form,
  element,
  elements,
  submitButton,
  click,
} from "./reactTestExtensions";

import AppointmentForm from "../src/AppointmentForm";
import { today, todayAt, tomorrowAt, tomorrow } from "./builders/time";
describe("AppointmentForm", () => {
  const services = ["Cut", "Blow-dry"];
  const blankAppointment = { service: "" };
  const availableTimeSlots = [
    { startsAt: todayAt(9) },
    { startsAt: todayAt(9, 30) },
  ];

  const testPros = {
    today,
    selectableServices: services,
    availableTimeSlots,
    original: blankAppointment,
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const labelOfAllOptions = (element) =>
    Array.from(element.childNodes, (node) => node.textContent);

  const findOption = (selectBox, textContent) => {
    const options = Array.from(selectBox.childNodes);
    return options.find((option) => option.textContent === textContent);
  };
  const startsAtField = (index) => elements("input[name=startsAt]")[index];

  it("renders a form", () => {
    render(<AppointmentForm {...testPros} />);
    expect(form()).not.toBeNull();
  });
  it("renders a submit button", () => {
    render(<AppointmentForm {...testPros} />);
    expect(submitButton()).not.toBeNull();
  });
  it("saves the existing value when submitted", () => {
    expect.hasAssertions();
    const appointment = {
      startsAt: availableTimeSlots[1].startsAt,
    };
    render(
      <AppointmentForm
        original={appointment}
        availableTimeSlots={availableTimeSlots}
        today={today}
        onSubmit={({ startsAt }) =>
          expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
        }
      />
    );
    click(submitButton());
  });

  it("saves a new value when submitted", () => {
    expect.hasAssertions();
    const appointment = {
      startsAt: availableTimeSlots[0].startsAt,
    };
    render(
      <AppointmentForm
        original={appointment}
        availableTimeSlots={availableTimeSlots}
        today={today}
        onSubmit={({ startsAt }) =>
          expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
        }
      />
    );
    click(startsAtField(1));
    click(submitButton());
  });

  describe("service field", () => {
    it("renders a select box", () => {
      render(<AppointmentForm {...testPros} />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(<AppointmentForm {...testPros} original={blankAppointment} />);
      const firstOption = field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    });

    it("lists all the salon services", () => {
      render(<AppointmentForm {...testPros} selectableServices={services} />);
      expect(labelOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(services)
      );
    });
    it("preselects the existing value", () => {
      const appointment = { service: "Blow-dry" };

      render(
        <AppointmentForm
          {...testPros}
          availableTimeSlots={availableTimeSlots}
          original={appointment}
        ></AppointmentForm>
      );
      const option = findOption(field("service"), "Blow-dry");
      expect(option.selected).toBe(true);
    });
  });
  describe("time slot table", () => {
    it("renders a table for time slot with id", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
        ></AppointmentForm>
      );
      expect(element("table#time-slots")).not.toBeNull();
    });
    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          original={blankAppointment}
          salonOpensAt={9}
          salonClosesAt={11}
        ></AppointmentForm>
      );
      const timeOfDaysHeadings = elements("tbody >* th");
      expect(timeOfDaysHeadings[0]).toContainText("09:00");
      expect(timeOfDaysHeadings[1]).toContainText("09:30");
      expect(timeOfDaysHeadings[3]).toContainText("10:30");
    });
    it("renders an empty cell at the start of header row", () => {
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          original={blankAppointment}
        />
      );
      const headerRow = element("thead > tr");
      expect(headerRow.firstChild).toContainText("");
    });
    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          original={blankAppointment}
          today={specificDate}
        />
      );
      const dates = elements("thead >* th:not(:first-child");
      expect(dates).toHaveLength(7);
      expect(dates[0]).toContainText("Sat 01");
      expect(dates[1]).toContainText("Sun 02");
      expect(dates[6]).toContainText("Fri 07");
    });
    const cellsWithRadioButtons = () =>
      elements("input[type=radio]").map((el) =>
        elements("td").indexOf(el.parentNode)
      );

    it("renders radio buttons in the correct table cell positions", () => {
      const availableSlots = [
        { startsAt: todayAt(9) },
        { startsAt: todayAt(9, 30) },
        { startsAt: tomorrowAt(9, 30) },
      ];
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableSlots}
          today={today}
        />
      );

      expect(cellsWithRadioButtons()).toEqual([0, 7, 8]);
    });
    it("doesnot render radio button for unavailable time slots", () => {
      render(
        <AppointmentForm original={blankAppointment} availableTimeSlots={[]} />
      );
      expect(elements("input[type=radio]")).toHaveLength(0);
    });
    it("sets radio button values to the startsAt value of the corresponding appointment", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      const allRadioValues = elements("input[type=radio]").map(({ value }) =>
        parseInt(value)
      );

      const allSlotTimes = availableTimeSlots.map(({ startsAt }) => startsAt);
      expect(allRadioValues).toEqual(allSlotTimes);
    });

    it("pre-selects the existing value", () => {
      const appointment = { startsAt: availableTimeSlots[1].startsAt };
      render(
        <AppointmentForm
          original={appointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      expect(startsAtField(1).checked).toEqual(true);
    });
  });
});
