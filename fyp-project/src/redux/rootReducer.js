import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import registerReducer from './reducer/registerReducer';
import docprofileReducer from './reducer/docprofileReducer';
import searchProfileReducer from './reducer/searchProfileReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  regis: registerReducer,
  profile:docprofileReducer,
  searchProfile:searchProfileReducer
});

export default rootReducer;