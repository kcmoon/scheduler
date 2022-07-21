import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // state object to hold all state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

   //function to update day state in the state object
   const setDay = (day) => setState({ ...state, day });

   // API request to obtain days, appointments data and set it to state
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Function to update the number of spots available for each day
  const updateSpots = (state) => {
    // Find the index of the day in the days array
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    // Find the day using the index
    const currentDay = state.days[currentDayIndex];
    // Determine the number of spots for the specific day
    const spots = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    ).length;
    // Update the state of spots in the current day
    const updatedDayObj = { ...currentDay, spots };
    // Update the state of days array with the updated newly updated state of the current day
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
    // Update the total state object with the newly updated days array
    // const updatedState = { ...state, days: updatedDaysArr };
  
    return updatedDaysArr;
  };

   // Booking an interview when clicking save
   function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointments[id])
    .then(setState({...state, appointments}))
    // Update the spots for each day
      .then(setState((prev) => {
        return {...prev, days: updateSpots(prev)}
      }));
  };

  // Cancelling an interview when clicking trash icon
  async function cancelInterview(id) {

    await axios.delete(`/api/appointments/${id}`);
    const appointments = {
      ...state.appointments, 
      [id]: {...state.appointments[id], interview: null}
    };
    setState((prev) => {
      return {...prev, appointments}
    });
    // Update the spots for each day
    setState((prev) => {
      return {...prev, days: updateSpots(prev)}
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}