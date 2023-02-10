import React from 'react';
import Card from './Card';
import axios from 'axios';
import { useState, useEffect, useCallback, useContext } from 'react';
import { TransContext } from '../../contexts/transContext';
import { getTransactions } from '../../contexts/apiCalls';

const DailyExpense = ({ monthYear }) => {
  const [data, setData] = useState([]);
  const { transactions, dispatch } = useContext(TransContext);

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
        //retrieveData();
        getTransactions(monthYear, dispatch);
      });
  };

  const callback = useCallback(() => {
    getTransactions(monthYear, dispatch);
  }, []);

  return (
    <div className="relative flex justify-center">
      {data.length > 0 && (
        <div className="w-[90%] mb-8 p-6">
          {data.map((val, index) => {
            return (
              <div
                key={index}
                className="w-[85%] mx-auto overflow-x-hidden p-4 bg-slate-100 rounded-lg border border-gray-300 shadow-md sm:p-8"
              >
                <div className="flex justify-between items-center mb-4 p-4">
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
                <div className="">
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
              </div>
            );
          })}
        </div>
      )}
      {!data.length > 0 && (
        <>
          <p className="font-bold">No transaction this month</p>
        </>
      )}
    </div>
  );
};

export default DailyExpense;
