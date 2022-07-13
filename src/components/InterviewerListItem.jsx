import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {

  const {id, name, avatar, selected, setInterviewer} = props;

  const interviewItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li onClick={() => setInterviewer(id)} className={interviewItemClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? name : null}
    </li>
  );

}
