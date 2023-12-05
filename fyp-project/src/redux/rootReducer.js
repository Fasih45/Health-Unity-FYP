import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import registerReducer from './reducer/registerReducer';
import docprofileReducer from './reducer/docprofileReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  regis: registerReducer,
  doc:docprofileReducer,
});

export default rootReducer;