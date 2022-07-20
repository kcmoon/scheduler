import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "John Doe" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "John Doe"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the Appointment?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
     // 1. Render the Application.
     const { container } = render(<Application />);
     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));
     // 3. Click the "Edit" button on the booked appointment.
     const appointment = getAllByTestId(container, "appointment").find(
       appointment => queryByText(appointment, "Archie Cohen"));
     fireEvent.click(queryByAltText(appointment, "Edit"));
     // Checks to see if Interviewer and Student Name Input field are present
     expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();
     expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
     // Student name is changed
     fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "John Doe" }
    });
     // 5. Click the "Save" button on the confirmation.
     fireEvent.click(getByText(appointment, "Save"));
     // 6. Check that the element with the text "Saving" is displayed.
     expect(getByText(appointment, "Saving")).toBeInTheDocument();
     // 7. Wait until the element with the new student name is displayed.
     await waitForElement(() => getByText(appointment, "John Doe"));
     // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
     const day = getAllByTestId(container, "day").find(day =>
       queryByText(day, "Monday"));
     expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
     // 1. Render the Application.
     const { container } = render(<Application />);
     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));
     // 3. Click the "Edit" button on the booked appointment.
     const appointment = getAllByTestId(container, "appointment").find(
       appointment => queryByText(appointment, "Archie Cohen"));
     fireEvent.click(queryByAltText(appointment, "Edit"));
     // Checks to see if Interviewer and Student Name Input field are present
     expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();
     expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
     // Student name is changed
     fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "John Doe" }
    });
     // 5. Click the "Save" button on the confirmation.
     axios.put.mockRejectedValueOnce();
     fireEvent.click(getByText(appointment, "Save"));
     // 6. Check that the element with the text "Saving" is displayed.
     expect(getByText(appointment, "Saving")).toBeInTheDocument();
     // 7. Wait until the element with the new student name is displayed.
     await waitForElement(() => getByText(appointment, "An Error has occured while Saving"));
     // 8. Confirm the close
     fireEvent.click(getByAltText(appointment, "Close"));
     expect(getByText(appointment, "Save")).toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the Appointment?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    axios.delete.mockRejectedValueOnce()
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByText(appointment, "An Error has occured while Deleting"));
    // 8. Confirm the Close
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });
});
