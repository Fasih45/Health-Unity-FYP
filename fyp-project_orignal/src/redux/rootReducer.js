import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import registerReducer from './reducer/registerReducer';
import docprofileReducer from './reducer/docprofileReducer';
import searchProfileReducer from './reducer/searchProfileReducer';
import appointmentReducer from './reducer/appointmentReducer';
import patientTrustedListReducer from "./reducer/patientTrustedlistReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  regis: registerReducer,
  profile:docprofileReducer,
  searchProfile:searchProfileReducer,
  appointment:appointmentReducer,
  patientTrustedList: patientTrustedListReducer
});

export default rootReducer;