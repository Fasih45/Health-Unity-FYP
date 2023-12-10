import {
    GET_APPOINTMENTS,
    APPOINTMENTS_SUCCESS,
    APPOINTMENTS_FAILURE,
  } from '../actions/appointmentAction';
  
  const initialState = {
    appointments: [],
    loading: false,
    error: null,
    statusCode: null,
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_APPOINTMENTS:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: action.payload,
          statusCode: action.statuscode,
        };
  
      case APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          statusCode: action.statuscode,
        };
  
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  