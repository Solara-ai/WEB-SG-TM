import { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Calendar = () => {
  //const [date, setDate] = useState(new Date());
  const [date] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Calendar</h1>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-medium">Current Date: {date.toDateString()}</h2>
            {/* Integrate a calendar library here */}
            <p className="mt-4">This is where the calendar will be displayed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;