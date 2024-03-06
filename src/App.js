import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [calendarDays, setCalendarDays] = useState([]);
  const [today, setToday] = useState(new Date().getDate());

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (month, year) => {
    if (month === 1) { // February
      return isLeapYear(year) ? 29 : 28;
    }
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    return 31;
  };

  const generateCalendarDays = (year, month) => {
    const daysInCurrentMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = month === 0 ? getDaysInMonth(11, year - 1) : getDaysInMonth(month - 1, year);

    // Adjust firstDayOfMonth to match your week start (Monday)
    const daysFromPreviousMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    let daysArray = [];
    // Add days from the previous month
    for (let i = daysFromPreviousMonth; i > 0; i--) {
      daysArray.push(-(daysInPreviousMonth - i + 1));
    }
    // Add days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push(i);
    }
    // Optionally, add days from the next month to complete the last week

    return daysArray;
  };

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    setToday(today.getDate());
    setCalendarDays(generateCalendarDays(currentYear, currentMonth));
  }, []);

  return (
    <>
      <main className='p-4 mx-auto'>
        <div className='flex flex-col gap-5'>
          <div><h1>Calendar</h1></div>
          <div className='flex flex-row md:gap-5 border border-indigo-600 border-round divide-x divide-slate-200 m-auto p-2 md:p-5'>
            {days.map((day, index) => <div key={index} className='p-1 text-xs md:p-3'>{day}</div>)}
          </div>
          <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
            {calendarDays.map((day, index) => {
              const isPast = day < today && day > 0; // Adjust if needed to account for your exact logic
              return <div key={index} className={`p-3 md:p-8 border-1 border-slate-200 shadow-md ${isPast ? 'bg-gray-300' : ''}`}>
                {Math.abs(day)}
              </div>
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
