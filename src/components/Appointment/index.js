import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  function removeAppointment() {
    transition(CONFIRM);
  };

  function deleteAppointment() {
    props.cancelInterview(props.id);
    transition(DELETE);
    transition(EMPTY);
  };

  function onCancel() {
    back();
  };

  function onEdit() {
    transition(EDIT);
  };

  return (
    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={removeAppointment}
          onEdit={onEdit}
        />
      )}

      {mode === CREATE && 
      <Form 
        onCancel={onCancel} 
        interviewers = {props.interviewers}
        onSave={onSave}
      />}

      {mode === EDIT && 
      <Form
        student={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={onSave}
        onCancel={onCancel}
      />}

      {mode === CONFIRM && 
      <Confirm 
        onCancel={onCancel} 
        onConfirm={deleteAppointment} 
        message={"Delete the Appointment?"}
      />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETE && <Status message={"Deleting"} />}
    </article>
  );

};