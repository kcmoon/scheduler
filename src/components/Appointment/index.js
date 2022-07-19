import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

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
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  };

  function removeAppointment() {
    transition(CONFIRM);
  };

  function deleteAppointment() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  function onCancel() {
    back();
  };

  function onEdit() {
    transition(EDIT);
  };

  console.log("props.interview:", props.interview, mode)

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

      {mode === ERROR_DELETE && 
        <Error
          message="An Error has occured while Deleting"
          onClose={onCancel}
        />}

      {mode === ERROR_SAVE && 
        <Error
          message="An Error has occured while Saving"
          onClose={onCancel}
        />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETE && <Status message={"Deleting"} />}
    </article>
  );

};