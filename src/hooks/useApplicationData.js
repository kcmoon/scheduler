import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // state object to hold all state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
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
  };

    // Cancelling an interview when clicking trash icon
    async function cancelInterview(id) {
      await axios.delete(`/api/appointments/${id}`)
      const appointments = {
        ...state.appointments, 
        [id]: {...state.appointments[id], interview: null}
      };
      setState((prev) => {
        return {...prev, appointments}
      })
    };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}