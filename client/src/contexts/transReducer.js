const TransReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANS_SUCCESS':
      return {
        transactions: action.payload,
        isFetching: false,
        error: false,
      };
    case 'CREATE_TRANS_SUCCESS':
      return {
        transactions: action.payload,
        isFetching: false,
        error: false,
      };
    case 'GET_TRANS_FAILURE':
      return {
        transactions: null,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default TransReducer;
