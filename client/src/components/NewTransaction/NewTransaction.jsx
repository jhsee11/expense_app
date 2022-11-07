import React, { useState, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import {
  CheckIcon,
  SelectorIcon,
  AiFillCloseCircle,
} from '@heroicons/react/solid';

const Modal = ({ parentCallback }) => {
  const categories = [
    { name: 'Food' },
    { name: 'Social Life' },
    { name: 'Self-Development' },
    { name: 'Transportation' },
    { name: 'Household' },
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Apparel' },
    { name: 'Beauty' },
    { name: 'Other' },
  ];

  const accounts = [{ name: 'Cash' }, { name: 'Credit Card' }];

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [val, setVal] = useState(0);
  const [openTab, setOpenTab] = React.useState(1);

  const [selected, setSelected] = useState({ name: 'Select A Category' });
  const [account, setAccount] = useState(accounts[0]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const [transaction, setTransaction] = React.useState({
    date: '',
    items: { category: '', account: '', amount: '', note: '', description: '' },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowModal(false);
    //alert(`The name you entered was: `);
    console.log(`Transaction is ${JSON.stringify(transaction)}`);

    // submit the POST request to create a new transaction
    axios
      .post(`http://localhost:5001/api/transaction/`, transaction)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        // trigger the parent function to trigger re-render
        parentCallback();
      });
  };

  const handleChange = (e) => {
    // destructure the object
    let newObj = { ...transaction };
    console.log('sini sini');
    console.log(`printing ${e.target.value}`);

    newObj.items[e.target.name] = e.target.value;
    console.log(newObj);
    setTransaction(newObj);
  };

  const handleListBox = (key, selected) => {
    // destructure the object
    let newObj = { ...transaction };
    console.log('sini sini');
    console.log(`printing ${selected}`);

    newObj.items[key] = selected.name;
    console.log(newObj);
    setTransaction(newObj);
  };

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-8"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Transaction
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none mb-16">
            <div className="relative h-[40%] w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <ul
                    className="flex mx-auto w-[70%] mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    <li className="ml-4 mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          'text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                          (openTab === 1
                            ? 'bg-red-300'
                            : 'text-pink-600 bg-white')
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
                    {/*}
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                          (openTab === 2
                            ? 'text-white bg-blue-600'
                            : 'text-pink-600 bg-white')
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
                    </li>*/}
                  </ul>

                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <FontAwesomeIcon
                      className="text-3xl"
                      icon={faCircleXmark}
                    />
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

                    <Listbox
                      value={selected}
                      name="category"
                      onChange={(selected) => {
                        setSelected(selected);
                        handleListBox('category', selected);
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 mb-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate ml-6 text-center">
                            {selected.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-amber-100 text-amber-900'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <label className="block text-black text-sm font-bold mb-1">
                      Account
                    </label>

                    {/* Account */}
                    <Listbox
                      value={account}
                      name="account"
                      onChange={(account) => {
                        setAccount(account);
                        handleListBox('account', account);
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="z-[0] relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 mb-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate ml-6 text-center z-[-1]">
                            {account.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {accounts.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-amber-100 text-amber-900'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
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
                        className="hover:text-white hover:bg-pink-600 bg-blue-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="hover:text-white hover:bg-pink-600  bg-blue-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
