import React from 'react';
import { useCallback, useState, useContext } from 'react';
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
    console.log('monthYear is ' + monthYear);
    getTransactions(monthYear, dispatch);

    console.log(`transContext transactions is ${JSON.stringify(transactions)}`);
  });

  //only runs when one of its dependencies update
  const callback = useCallback((date) => {
    console.log(`date is ${date}`);
    setMonthYear(date);
  }, []);

  return (
    <div>
      <h1 className="font-bold text-4xl text-rose-800 font-serif mt-8 ">
        Expense Tracker
      </h1>
      <MonthPicker parentCallback={callback} range={range} />
      <Tabs refresh={update} monthYear={monthYear} />
      <NewTransaction parentCallback={forceUpdate} />
    </div>
  );
};

export default Main;
