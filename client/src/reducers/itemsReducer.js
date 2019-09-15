import {
  FETCH_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  LOADING_ITEMS
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, loading: false };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case LOADING_ITEMS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
