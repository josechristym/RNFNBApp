// store/reducers.js
import { combineReducers } from 'redux';
import CartReducer from './cartreducer';
import UserManagementReducer from './usermanagementReducer';
import FNBReducer from './fnbReducer';
const rootReducer = combineReducers({
  cartinfo:CartReducer,
  userlogin:UserManagementReducer,
  fnbinfo:FNBReducer
});

export default rootReducer;
