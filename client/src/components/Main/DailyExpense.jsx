import React from 'react';
import Card from './Card';
//import data from './TransactionApi';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DailyExpense = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //let cancel = false;

    axios.get('http://localhost:5001/api/transaction').then((response) => {
      //if (cancel) return;

      console.log(`response is ${JSON.stringify(response.data)}`);
      console.log(`type is ${typeof data}`);
      setData(response.data);

      console.log(`data is ${JSON.stringify(data)}`);
    });

    //   return () => {
    //     cancel = true;
    //   };
  }, []);

  return (
    <div>
      {data.map((val, index) => {
        return (
          <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                {val.date}
              </h5>
              <a
                href="#"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
            </div>
            {val.items.map((item, index) => {
              return (
                <Card
                  key={index}
                  category={item.category}
                  note={item.note}
                  account={item.account}
                  amount={item.amount}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DailyExpense;
