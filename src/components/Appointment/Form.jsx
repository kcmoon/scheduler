import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const { student: studentName, interviewers, interviewer: interviewerNumber, onSave, onCancel } = props;

  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerNumber || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("") 
    setInterviewer(null)
  };

  const cancel = () => {
    reset()
    onCancel()
  };
  
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an Interviewer");
      return;
    }
    return onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );

};