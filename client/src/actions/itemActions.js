import axios from 'axios';

import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, LOADING_ITEMS } from './types';

export const fetchItems = () => dispatch => {
  dispatch(setLoadingItems());
  axios.get('/api/items').then(res =>
    dispatch({
      type: FETCH_ITEMS,
      payload: res.data
    })
  );
};

export const addItem = item => dispatch => {
  axios.post('/api/items', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};
export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const setLoadingItems = () => {
  return {
    type: LOADING_ITEMS
  };
};
