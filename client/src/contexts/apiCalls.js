import axios from 'axios';
import { useContext } from 'react';
import { TransContext } from './transContext';
import { getTrans, createTrans, getTransFailure } from './transActions';

export const getTransactions = async (formattedDate, dispatch) => {
  try {
    const res = await axios
      .get('http://localhost:5001/api/transaction/find/month/' + formattedDate)
      .then((response) => {
        console.log(`Inside getTransactions api call`);
        console.log(`response is ${JSON.stringify(response.data)}`);
        dispatch(getTrans(response.data));
      });
  } catch (err) {
    console.log(`Failure oredy ${err}`);
    dispatch(getTransFailure());
  }
};
