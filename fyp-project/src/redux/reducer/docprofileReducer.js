// src/reducers/doctorReducer.js
import {
    GET_DOCTOR_PROFILE,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAILURE,
  } from '../actions/docProfile';
  
  const initialState = {
    status: 'idle',
    user: null,
    statusCode: null,
  };
  
  const docprofileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DOCTOR_PROFILE:
        return {
          ...state,
          status: 'loading',
          
        };
      case DOCTOR_PROFILE_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          user: action.payload,
          statusCode: action.statuscode,
        };
      case DOCTOR_PROFILE_FAILURE:
        return {
          ...state,
          status: 'failed',
          user: action.payload,
          statusCode: action.statuscode,
        };
      default:
        return state;
    }
  };
  
  export default docprofileReducer;
  