import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = ({ range, parentCallback }) => {
  const [isVisible, setVisibility] = useState(true);
  const [monthYear, setMonthYear] = useState({ month: '', year: 0 });
  const [startDate, setStartDate] = useState(new Date());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getMonthValue = () => {
    const month = monthYear && monthYear.month ? monthYear.month : 0;
    const year = monthYear && monthYear.year ? monthYear.year : 0;
    return month && year ? `${month}-${year}` : 'Select Month Lai';
  };

  const handleOnChange = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    setMonthYear({ month: month, year: year });
    setStartDate(date);

    let returnDate = (date.getMonth() + 1)
      .toString()
      .padStart(2, 0)
      .concat('-', date.getFullYear());

    parentCallback(returnDate);
  };

  return (
    <div className="MonthYearPicker w-80 mx-auto mt-10">
      Select Month
      <DatePicker
        className="text-center flex justify-content shadow border rounded w-full py-2 px-1 mb-2 text-black"
        selected={startDate}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        onChange={handleOnChange}
      />
      <div className="my-4">
        Month : {monthNames[startDate.getMonth()]} {startDate.getFullYear()}
      </div>
    </div>
  );
};

export default MonthPicker;
