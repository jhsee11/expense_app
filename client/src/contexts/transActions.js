export const createTrans = (trans) => ({
  type: 'CREATE_TRANS_SUCCESS',
  payload: trans,
});

export const getTrans = (trans) => ({
  type: 'GET_TRANS_SUCCESS',
  payload: trans,
});

export const getTransFailure = (trans) => ({
  type: 'GET_TRANS_FAILURE',
});
