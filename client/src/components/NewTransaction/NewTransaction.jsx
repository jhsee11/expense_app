import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [val, setVal] = useState(0);
  const [openTab, setOpenTab] = React.useState(1);

  const [transaction, setTransaction] = React.useState({
    date: '',
    items: { category: '', account: '', amount: '', note: '', description: '' },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowModal(false);
    //alert(`The name you entered was: `);

    console.log(`Transaction is ${JSON.stringify(transaction)}`);

    axios
      .post(`http://localhost:5001/api/transaction/`, transaction)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const handleChange = (e) => {
    let newObj = { ...transaction };

    newObj.items[e.target.name] = e.target.value;
    console.log(newObj);
    setTransaction(newObj);
  };
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Transaction
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <ul
                    className="flex mx-auto mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                          (openTab === 1
                            ? 'text-white bg-blue-600'
                            : 'text-green-600 bg-white')
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        Expense
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                          (openTab === 2
                            ? 'text-white bg-blue-600'
                            : 'text-green-600 bg-white')
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        Income
                      </a>
                    </li>
                  </ul>

                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div
                  className={
                    openTab === 1 ? 'block relative p-6 flex-auto' : 'hidden'
                  }
                >
                  <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      Date
                    </label>
                    <DatePicker
                      className="text-center shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      selected={transaction.date}
                      name="date"
                      onChange={(newDate) => {
                        setTransaction({ ...transaction, date: newDate });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Category
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      name="category"
                      value={transaction.items.category}
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Account
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      name="account"
                      value={transaction.items.account}
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      className="shadow number appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      name="amount"
                      value={transaction.items.amount}
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Note
                    </label>
                    <input
                      className="shadow apperance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      name="note"
                      value={transaction.items.note}
                      onChange={handleChange}
                    />

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className={
                    openTab === 2 ? 'block relative p-6 flex-auto' : 'hidden'
                  }
                >
                  <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      Date
                    </label>
                    <DatePicker
                      className="text-center shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      selected={transaction.date}
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Category
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Account
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Amount
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      className="shadow number appearance-none border rounded w-full py-2 px-1 mb-2 text-black"
                      value={val}
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Note
                    </label>
                    <input className="shadow apperance-none border rounded w-full py-2 px-1 mb-2 text-black" />

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
