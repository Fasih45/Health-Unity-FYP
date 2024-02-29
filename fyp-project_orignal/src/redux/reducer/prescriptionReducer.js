import {
  CREATE_PRESCRIPTION,
  GET_PRESCRIPTION,
  UPDATE_PRESCRIPTION,
  DELETE_PRESCRIPTION,
  PRESCRIPTION_SUCCESS,
  PRESCRIPTION_FAILURE,
} from '../actions/prescriptionAction';

const initialState = {
  prescription: null,
  loading: false,
  error: null,
  statusCode: null,
};

const prescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRESCRIPTION:
    case GET_PRESCRIPTION:
    case UPDATE_PRESCRIPTION:
    case DELETE_PRESCRIPTION:
      return {
        ...state,
        loading: true,
        error: null,
        prescription: null,
        statusCode: null,
      };

    case PRESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        prescription: action.payload,
        statusCode: action.statuscode,
      };

    case PRESCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        prescription: null,
        error: action.payload,
        statusCode: action.statuscode,
      };

    default:
      return state;
  }
};

export default prescriptionReducer;