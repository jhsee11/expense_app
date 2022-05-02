import React from 'react';
import DailyExpense from './DailyExpense';
import NewTransaction from '../NewTransaction/NewTransaction';

const Main = () => {
  return (
    <div>
      <DailyExpense />
      <NewTransaction />
    </div>
  );
};

export default Main;
