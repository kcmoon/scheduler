import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, day: currentDay, setDay } = props;

  const dayListComponentsArray = days.map((day) =>{

    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={currentDay === day.name}
        setDay={setDay}
      />
    );

  });

  return (
    <ul>
      {dayListComponentsArray}
    </ul>
  );

}