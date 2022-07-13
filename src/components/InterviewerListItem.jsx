import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {

  const {name, avatar, selected, setInterviewer} = props;

  const interviewItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewItemClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? name : null}
    </li>
  );

}
