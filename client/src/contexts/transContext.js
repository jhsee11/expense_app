import TransReducer from './transReducer';
import { createContext, useEffect, useReducer } from 'react';
import { getTransactions } from './apiCalls';
import axios from 'axios';

const INITIAL_STATE = {
  transactions: null,
  isFetching: false,
  error: false,
};

export const TransContext = createContext(INITIAL_STATE);

export const TransContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransReducer, INITIAL_STATE);

  useEffect(() => {
    const date = new Date();
    let formattedDate = (date.getMonth() + 1)
      .toString()
      .padStart(2, 0)
      .concat('-', date.getFullYear());

    axios
      .get('http://localhost:5001/api/transaction/find/month/' + formattedDate)
      .then((response) => {
        console.log(`response is ${JSON.stringify(response.data)}`);
        //state.transactions = response.data;
        getTransactions(formattedDate, dispatch);
      });
  }, []);

  return (
    <TransContext.Provider
      value={{
        transactions: state.transactions,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TransContext.Provider>
  );
};
