import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils/util";
import EventModal from "../components/EventModal";
import CalendarHeader from "../components/CalendarHeader";
import Month from "../components/Month";

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="min-h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CalendarPage;
