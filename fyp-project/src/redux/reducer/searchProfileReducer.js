// reducer.js
import {
  GET_DOCTOR_PROFILES,
  DOCTOR_PROFILES_SUCCESS,
  DOCTOR_PROFILE_SUCCESS,
  DOCTOR_PROFILES_FAILURE,
  RESET_DOCTOR_PROFILES,
} from "../actions/searcProfileAction";

const initialState = {
  profiles: [],
  currentPage: 1,
  totalItems: 0,
  loading: false,
  error: null,
  statuscode: null,
  singleprofile:null
};

const searchProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTOR_PROFILES:
      return {
        ...state,
        loading: true,
        error: null,
        statuscode: null,
      };

    case DOCTOR_PROFILES_SUCCESS:
      const { profiles, currentPage, totalItems } = action.payload;
      return {
        ...state,
        profiles,
        currentPage,
        totalItems,
        loading: false,
        error: null,
        statuscode: action.statuscode,
      };

    case DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        statuscode: action.statuscode,
        singleprofile:action.singleprofile

      };

    case DOCTOR_PROFILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_DOCTOR_PROFILES:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default searchProfileReducer;
