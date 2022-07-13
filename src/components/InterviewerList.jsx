import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviwerList(props) {

  const { interviewers, setInterviewer, interviewer: interviewerNumber} = props;

  const mappedInterviewers = interviewers.map((interviewer) => {

    return (
      <InterviewerListItem 
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewerNumber === interviewer.id}
        setInterviewer={setInterviewer}
      />
    );

  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  );

}
