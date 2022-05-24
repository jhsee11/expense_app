import React from 'react';
import Card from './Card';
//import data from './TransactionApi';
import axios from 'axios';
import { useState, useEffect, useCallback, useContext } from 'react';
import { format } from 'date-fns';
import { TransContext } from '../../contexts/transContext';
import { getTransactions } from '../../contexts/apiCalls';

const DailyExpense = ({ monthYear }) => {
  const [data, setData] = useState([]);
  const { transactions } = useContext(TransContext);

  function retrieveData() {
    axios
      .get('http://localhost:5001/api/transaction/find/month/' + monthYear)
      .then((response) => {
        console.log(`response is ${JSON.stringify(response.data)}`);
        setData(response.data);
      });
  }

  // use effect to re-render based on the input
  useEffect(() => {
    retrieveData();
    console.log('Daily Expense useEffect is triggered !');
  }, [monthYear, transactions]);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:5001/api/transaction/' + id)
      .then((response) => {
        console.log(`delete id is ${id}`);
        console.log('leggo delete main entry');
        retrieveData();
      });
  };

  const callback = useCallback(() => {
    axios
      .get('http://localhost:5001/api/transaction/find/month/' + monthYear)
      .then((response) => {
        console.log(`response is ${JSON.stringify(response.data)}`);
        console.log(`type is ${typeof data}`);
        setData(response.data);
        console.log(`data is ${JSON.stringify(data)}`);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-4/5 mb-8 p-6">
        {data.map((val, index) => {
          return (
            <div
              key={index}
              className="p-4 matailwx-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {new Date(val.date).toLocaleDateString()}
                </h5>
                <button onClick={() => handleDelete(val._id)}>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Delete
                  </a>
                </button>
              </div>
              {val.items.map((item, index) => {
                return (
                  <ul key={index}>
                    <Card
                      parentCallback={callback}
                      category={item.category}
                      note={item.note}
                      account={item.account}
                      amount={item.amount}
                      id={item._id}
                      main_id={val._id}
                      display_month={monthYear}
                    />
                  </ul>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyExpense;
