// Gets appointments for given day
export function getAppointmentsForDay(state, day) {
  // created empty array to push filtered appointments
  let filteredAppointments = [];
  // filtered the days array of the state object to match the day provided and assigned object to variable filteredDayObj
  const filteredDayObj = state.days.filter(d => d.name === day)[0];

  // if filteredDayObj is undefined or the days array in the object is empty, return an empty array
  if (filteredDayObj === undefined || state.days.length === 0) {
    return [];
  }
  // loop through the appointments array of the filteredDayObj by appointment id 
  filteredDayObj.appointments.forEach(appointmentId => {

    // push all apppointments with the appointment id to the filteredAppointments array
    filteredAppointments.push(state.appointments[appointmentId])
  });

  return filteredAppointments;
};
// Gets interview if object passed in state contains interviewer
export function getInterview(state, interview) {
  // if interviewer not present, return null
  if (!interview) {
    return null;
  }
  // set variable containing interviewer id => use to access the interviewer for object to be returned
  const interviewerId = interview.interviewer;
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  };

  return interviewObj;
};

export function getInterviewersForDay(state, day) {
  // created empty array to push filtered interviewers
  let filteredInterviewers = [];
  // filtered the days array of the state object to match the day provided and assigned object to variable filteredDayObj
  const filteredDayObj = state.days.filter(d => d.name === day)[0];

  // if filteredDayObj is undefined or the days array in the object is empty, return an empty array
  if (filteredDayObj === undefined || state.days.length === 0) {
    return [];
  }
  // loop through the interviewers array of the filteredDayObj by appointment id 
  filteredDayObj.interviewers.forEach(interviewerId => {

    // push all apppointments with the appointment id to the filteredinterviewers array
    filteredInterviewers.push(state.interviewers[interviewerId])
  });

  return filteredInterviewers;
};