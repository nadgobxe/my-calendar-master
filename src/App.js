import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const numberOfDaysOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const [today, setToday] = useState(0);

  const isLeapYear = (year) => {  //check if year is leap year
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  useEffect(() => {

    const date = new Date(); //initialize date object

    const getMonth = date.getMonth(); //get month
    const getPreviousMonth = date.getMonth() - 1; //get previous month
    const getNextMonth = date.getMonth() + 1; //get next month



    const getMonthName = (month) => {
      return months[month]
    };  //get month name


    const getMonthSize = (month) => { 
      return numberOfDaysOfMonth[month] 
    }; //get month size


    const getToday = date.getDate(); //get today

    const getYear = date.getFullYear(); // Get current year

    numberOfDaysOfMonth[1] = isLeapYear(getYear) ? 29 : 28; //check if year is leap year

    let daysArray = []; //curent month days array

    for (let i = 0; i < getMonthSize(getMonth); i++) {
      daysArray.push(i + 1)
    }

    let previousMonthDaysArray = []; //previous month days array

    for (let i = 0; i < getMonthSize(getPreviousMonth); i++) {
      previousMonthDaysArray.push(-(i + 1))
    }

    let nextMonthDaysArray = []; //next month days array

    for (let i = 0; i < getMonthSize(getNextMonth); i++) {
      nextMonthDaysArray.push(i + 1)
    }

  
    setCurrentMonth(days);
    setToday(getToday);

    // console.log(`No of Days Previous Month ${getMonthSize(getPreviousMonth)}`)
    // console.log(days[date.getDay() - 1]);

    // console.log(previousMonthDaysArray);

    const getFirstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const getLastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), getMonthSize(getMonth) - 1).getDay();

    const prevMonthRemainingDays = previousMonthDaysArray.slice(-getFirstDayOfMonth + 1);

    const nextMonthRemainingDays = nextMonthDaysArray.slice(0, 6 - getLastDayOfMonth);

    const displayCalendarDays = prevMonthRemainingDays.concat(daysArray, nextMonthRemainingDays);

    setCalendarDays(displayCalendarDays);
    console.log(displayCalendarDays)




  }, []);

  return (
    <>
      <main className='p-4 mx-auto'>
        <div className='flex flex-col gap-5'>
          <div><h1>Calendar</h1></div>
          <div className='flex flex-row md:gap-5 border border-indigo-600 border-round divide-x divide-slate-200 m-auto p-2 md:p-5'>
            {currentMonth && currentMonth.map((month, index) => {
              return <div key={index} className='p-1 text-xs md:p-3'>{month}</div>
            })}
          </div>
          <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
            {calendarDays.map((day, index) => {
              const isPast = day < today; // Simple comparison for current month

              return <div key={index} className={`p-3 md:p-8 border-1 border-slate-200 shadow-md ${isPast ? 'bg-gray-300' : ''}`}
              >{Math.abs(day)}</div>
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
