import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  getDay,
  getDaysInMonth,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from "date-fns";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const eventTextRef = useRef(null);

  const handleDateClick = (date) => setSelectedDate(date);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addEvent = () => {
    const eventText = eventTextRef.current.value;
    if (eventText.trim()) {
      setEvents((prevEvents) => {
        const dateKey = selectedDate.toDateString();
        return {
          ...prevEvents,
          [dateKey]: prevEvents[dateKey]
            ? [...prevEvents[dateKey], eventText]
            : [eventText],
        };
      });
    }
    closeModal();
  };

  const changeMonth = (direction) => {
    setSelectedDate((prevDate) =>
      direction === "prev" ? subMonths(prevDate, 1) : addMonths(prevDate, 1)
    );
  };

  const changeYear = (direction) => {
    setSelectedDate((prevDate) =>
      direction === "prev" ? subYears(prevDate, 1) : addYears(prevDate, 1)
    );
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = startOfMonth(selectedDate);
    const firstDayIndex = getDay(firstDayOfMonth);
    const totalDays = getDaysInMonth(selectedDate);
    const today = new Date().toDateString();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const dateKey = date.toDateString();
      const isSelected = selectedDate.toDateString() === dateKey;
      const isToday = today === dateKey;
      const hasEvent = events[dateKey]?.length > 0;

      days.push(
        <button
          key={i}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition duration-300 font-medium
            ${
              isSelected
                ? "bg-gray-700 text-white"
                : isToday
                ? "bg-gray-400 text-white"
                : "bg-white text-gray-800"
            }
            ${hasEvent ? "border-2 border-red-500" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={toggleSidebar} className="text-gray-600">
                <Menu />
              </button>
              <button
                onClick={() => changeYear("prev")}
                className="text-gray-600"
              >
                &laquo;
              </button>
              <button
                onClick={() => changeMonth("prev")}
                className="text-gray-600"
              >
                <ChevronLeft />
              </button>
              <h2 className="text-xl font-bold text-gray-700">
                {format(selectedDate, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => changeMonth("next")}
                className="text-gray-600"
              >
                <ChevronRight />
              </button>
              <button
                onClick={() => changeYear("next")}
                className="text-gray-600"
              >
                &raquo;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-medium">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <motion.div
                  key={day}
                  className="w-12 h-12 flex items-center justify-center font-bold"
                >
                  {day}
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">{renderDays()}</div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800"
              onClick={openModal}
            >
              Add Event
            </motion.button>
            <div className="mt-4 p-4 bg-gray-200 rounded-lg border border-gray-300">
              <p className="text-gray-700">
                {events[selectedDate.toDateString()] ||
                  "No events planned for this day."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto"
          >
            <h2 className="text-lg font-bold mb-4">All Events</h2>
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={toggleSidebar}
            >
              <X />
            </button>
            {Object.keys(events).length > 0 ? (
              <ul>
                {Object.entries(events).map(([date, eventList]) => (
                  <li key={date} className="mb-3 p-2 border rounded">
                    <p className="font-bold">{date}</p>
                    <ul className="list-disc pl-4">
                      {eventList.map((event, index) => (
                        <li key={index}>{event}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events added yet.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700">Add Event</h2>
                <button onClick={closeModal} className="focus:outline-none">
                  <X className="text-gray-600" />
                </button>
              </div>
              <input
                ref={eventTextRef}
                type="text"
                placeholder="Enter event details"
                className="w-full p-2 border rounded-lg mb-4 text-gray-800"
              />
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700"
                onClick={addEvent}
              >
                Save Event
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
