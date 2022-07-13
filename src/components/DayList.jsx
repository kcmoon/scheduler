import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, value, onChange } = props;

  const mappedDays = days.map((day) =>{

    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={value === day.name}
        setDay={onChange}
      />
    );

  });

  return (
    <ul>
      {mappedDays}
    </ul>
  );

}