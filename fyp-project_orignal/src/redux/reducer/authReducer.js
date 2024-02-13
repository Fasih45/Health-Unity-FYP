import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  statuscode:null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
        statuscode:null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        statuscode:action.statuscode,

      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        statuscode:action.statuscode,
      };
    default:
      return state;
  }
};

export default authReducer;