import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { TransContext } from '../../contexts/transContext';
import EditModal from '../EditTransaction/EditTransaction';

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
    <div className="relative">
      <ul role="list" className="divide-y divide-gray-200 px-2">
        <li className="flex p-4 border-2 rounded border-blue-200 overflow-auto">
          <div className="z-5 flex space-x-4">
            <div className="w-40">
              <p>{props.category}</p>
            </div>
            <div className="w-28 ml-20">
              <p className="text-sm justify-end font-medium text-gray-900">
                {props.note}
              </p>
            </div>
            <div className="ml-10 w-24">
              <p className="text-sm text-gray-500  dark:text-gray-400">
                {props.account}
              </p>
            </div>
            <div className="w-24 ml-12 items-center text-base font-semibold text-gray-900">
              {props.amount}
            </div>
          </div>
          <div className="relative desktopBig:absolute desktopBig:right-4 flex pr-2 ">
            <EditModal
              display_month={props.display_month}
              main_id={main_id}
              id={trans_id}
            />
            <button onClick={handleClick}>
              <FontAwesomeIcon className="m-1" icon={faTrashCan} />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
