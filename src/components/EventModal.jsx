import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdClose } from "react-icons/md";

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [name, setName] = useState(selectedEvent ? selectedEvent.name : "");
  const [gender, setGender] = useState(
    selectedEvent ? selectedEvent.gender : ""
  );
  const [age, setAge] = useState(selectedEvent ? selectedEvent.age : 0);
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : "");
  const [date, setDate] = useState(selectedEvent ? selectedEvent.date : "");

  function handleSubmit(e) {
    e.preventDefault();
    const appointment = {
      name,
      age,
      gender,
      time,
      date: new Date(date).getTime(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: appointment });
    } else {
      dispatchCalEvent({ type: "push", payload: appointment });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="font-bold py-3 text-green-700">
            Appointment Details
          </span>
          <div className="gap-5 flex items-center">
            <button onClick={() => setShowEventModal(false)}>
              <MdClose className=" text-gray-400 cursor-pointer " />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <label className="text-green-700">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="your name"
              value={name}
              required
              className="pt-3 border-0 text-gray-600 placeholder-gray-300 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-green-700">Age:</label>
            <input
              type="number"
              name="age"
              placeholder="your age"
              value={age}
              required
              className="pt-3 border-0 text-gray-600 placeholder-gray-300 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="text-green-700">Gender:</label>
            <input
              type="text"
              name="gender"
              placeholder="your gender"
              value={gender}
              required
              className="pt-3 border-0 text-gray-600 placeholder-gray-300 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="text-green-700">Schedule:</label>
            <input
              type="date"
              value={date}
              className="pt-3 border-0 text-gray-600 placeholder-gray-300 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDate(e.target.value)}
            />
            <label className="mr-2 text-green-700">Select Time:</label>
            <input
              type="time"
              value={time}
              className="pt-3 border-0 text-gray-600 placeholder-gray-300 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        {!selectedEvent && (
          <footer className="flex justify-end  p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        )}
      </form>
    </div>
  );
}
