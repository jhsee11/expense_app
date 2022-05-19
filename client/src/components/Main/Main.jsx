import React from 'react';
import { useCallback, useState } from 'react';
import DailyExpense from './DailyExpense';
import NewTransaction from '../NewTransaction/NewTransaction';
import MonthPicker from '../MonthPicker/MonthPicker';
import Tabs from '../Tabs/Tabs';

const Main = () => {
  const range = {
    min: { year: 2020, month: 3 },
    max: { year: 2025, month: 2 },
  };
  // let returnDate = (date.getMonth() + 1).toString().concat('-', date.getFullYear());
  const date = new Date();

  const [monthYear, setMonthYear] = useState(
    (date.getMonth() + 1).toString().concat('-', date.getFullYear())
  );

  const callback = useCallback((date) => {
    setMonthYear(date);
  }, []);

  return (
    <div>
      <MonthPicker parentCallback={callback} range={range} />
      <div>date is {monthYear}</div>
      {/*
      <DailyExpense monthYear={monthYear} />
      */}
      <Tabs color="pink" monthYear={monthYear} />
      <NewTransaction />
    </div>
  );
};

export default Main;
