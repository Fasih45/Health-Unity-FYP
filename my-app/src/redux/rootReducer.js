import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import registerReducer from './reducer/registerReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  regis: registerReducer,
});

export default rootReducer;