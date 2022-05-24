import React from 'react';
import { useCallback, useState, useContext } from 'react';
import DailyExpense from './DailyExpense';
import NewTransaction from '../NewTransaction/NewTransaction';
import MonthPicker from '../MonthPicker/MonthPicker';
import Tabs from '../Tabs/Tabs';

import { TransContext } from '../../contexts/transContext';
import { getTransactions } from '../../contexts/apiCalls';

const Main = () => {
  const { transactions, dispatch } = useContext(TransContext);

  const range = {
    min: { year: 2020, month: 3 },
    max: { year: 2025, month: 2 },
  };
  // let returnDate = (date.getMonth() + 1).toString().concat('-', date.getFullYear());
  const date = new Date();

  const [monthYear, setMonthYear] = useState(
    (date.getMonth() + 1)
      .toString()
      .padStart(2, 0)
      .concat('-', date.getFullYear())
  );

  const [update, setUpdate] = useState();
  const forceUpdate = useCallback(() => {
    console.log('LAI LIAO LAI LIAO');
    console.log('LAI LIAO monthYear is ' + monthYear);
    getTransactions(monthYear, dispatch);

    console.log(`transContext transactions is ${JSON.stringify(transactions)}`);
  });

  const callback = useCallback((date) => {
    setMonthYear(date);
  }, []);

  return (
    <div>
      <MonthPicker parentCallback={callback} range={range} />
      {/*<div>date is {monthYear}</div>*/}
      <Tabs refresh={update} monthYear={monthYear} />
      <NewTransaction parentCallback={forceUpdate} />
    </div>
  );
};

export default Main;
