import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
  auth: authReducer
});
