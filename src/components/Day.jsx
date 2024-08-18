import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    daySelected,
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    savedEvents,
  } = useContext(GlobalContext);

  function sortDataByTime(database) {
    const sortedData = database.slice().sort((a, b) => {
      return (
        new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
      );
    });
    return sortedData;
  }

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(sortDataByTime(events));
  }, [day, savedEvents]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-green-600 text-white rounded-full w-7"
      : "";
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="border h-[120px] overflow-y-auto border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm text-green-700 font-bold mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm text-green-900 p-1 my-1 text-center  ${getCurrentDayClass()} ${getDayClass(
            day
          )}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
              setDaySelected(day);
              setShowEventModal(true);
            }}
            className={`bg-green-400 p-1 mr-3 text-white text-sm rounded mb-1 cursor-pointer truncate`}
          >
            {evt.time}
          </div>
        ))}
      </div>
    </div>
  );
}
