import React from 'react';

const Card = (props) => {
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="p-4 border">
          <div className="flex justify-between items-center space-x-4">
            <div className="w-24">
              <p>{props.category}</p>
            </div>
            <div className="">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {props.note}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {props.account}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {props.amount}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
