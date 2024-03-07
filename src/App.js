import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Mon", "Tue", "Wedy", "Thu", "Fri", "Sat", "Sun"];
  
  const [calendarDays, setCalendarDays] = useState([]);
  const [today, setToday] = useState(new Date().getDate());
  const [month, setMonth] = useState(months[new Date().getMonth() - 1]);

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
      console.log(daysArray)
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

    console.log(month)
  }, []);

  return (
    <>
      <main className='p-4 mx-auto'>
        <div className='flex flex-col gap-5'>
          <div><h1>Calendar</h1></div>
          <div className='flex'>
            <div className='flex-none'><button>Back</button></div>
            <div className='grow flex justify-center'>{month}</div>
            <div className='flex-none'><button>Back</button></div>
          </div>
          <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
            {days.map((day, index) => <div key={index} className='p-1 w-11 text-sm font-semibold flex justify-center md:p-8 border-1 border-slate-200 shadow-md'>{day}</div>)}
          </div>
          <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
            {calendarDays.map((day, index) => {
              const isPast = day < today; // Adjust if needed to account for your exact logic
              return <div key={index} className={`p-1 w-11 text-sm cursor-pointer font-semibold flex justify-center md:p-8 border-1 border-slate-200 shadow-md ${isPast ? 'bg-gray-300 font-normal line-through cursor-none' : ''}`}>
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
