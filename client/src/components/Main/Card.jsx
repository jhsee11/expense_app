import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import {
  faCoffee,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Card = (props) => {
  const [transId, setTransId] = useState();
  const main_id = props.main_id;
  const trans_id = props.id;
  //setTransId(props.id);

  const handleClick = () => {
    //alert('test ' + main_id + ' ' + trans_id);
    axios
      .delete(
        'http://localhost:5001/api/transaction/' + main_id + '/' + trans_id
      )
      .then(() => {
        //console.log(`delete response is ${JSON.stringify(response.data)}`);
        console.log('apa ini callback');
        props.parentCallback();
      });
  };

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
            <div className="relative right-0">
              <FontAwesomeIcon className="m-1" icon={faPenToSquare} />
              <button onClick={handleClick}>
                <FontAwesomeIcon className="m-1" icon={faTrashCan} />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
