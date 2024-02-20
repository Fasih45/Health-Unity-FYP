import {
    ADD_DOCTOR_TO_LIST_REQUEST,
    ADD_DOCTOR_TO_LIST_SUCCESS,
    ADD_DOCTOR_TO_LIST_FAILURE,
    REMOVE_DOCTOR_FROM_LIST_REQUEST,
    REMOVE_DOCTOR_FROM_LIST_SUCCESS,
    REMOVE_DOCTOR_FROM_LIST_FAILURE,
    GET_TRUSTED_DOCTORS_LIST_REQUEST,
    GET_TRUSTED_DOCTORS_LIST_SUCCESS,
    GET_TRUSTED_DOCTORS_LIST_FAILURE
  } from "../actions/patientTrustedlistAction";
  
  const initialState = {
    loading: false,
    trustedDoctors: [],
    error: null,
    statusCode: null
  };
  
  const patientTrustedListReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DOCTOR_TO_LIST_REQUEST:
      case REMOVE_DOCTOR_FROM_LIST_REQUEST:
      case GET_TRUSTED_DOCTORS_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          statusCode: null
        };
      case ADD_DOCTOR_TO_LIST_SUCCESS:
      case REMOVE_DOCTOR_FROM_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          statusCode: action.statuscode
        };
      case GET_TRUSTED_DOCTORS_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          trustedDoctors: action.payload,
          error: null,
          statusCode: action.statuscode
        };
      case ADD_DOCTOR_TO_LIST_FAILURE:
      case REMOVE_DOCTOR_FROM_LIST_FAILURE:
      case GET_TRUSTED_DOCTORS_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          statusCode: action.statuscode
        };
      default:
        return state;
    }
  };
  
  export default patientTrustedListReducer;
  