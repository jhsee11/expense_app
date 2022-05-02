import React from 'react';

const Card = (props) => {
  return (
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <p>{props.category}</p>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {props.note}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {props.account}
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {props.amount}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
