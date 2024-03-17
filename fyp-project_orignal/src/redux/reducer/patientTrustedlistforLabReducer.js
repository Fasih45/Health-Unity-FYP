// reducer.js
import {
  ADD_LAB_TO_PATIENT_TRUSTED_LIST_REQUEST,
  ADD_LAB_TO_PATIENT_TRUSTED_LIST_SUCCESS,
  ADD_LAB_TO_PATIENT_TRUSTED_LIST_FAILURE,
  REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_REQUEST,
  REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_SUCCESS,
  REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_FAILURE,
  GET_TRUSTED_MEDICAL_LAB_REQUEST,
  GET_TRUSTED_MEDICAL_LAB_SUCCESS,
  GET_TRUSTED_MEDICAL_LAB_FAILURE,
  GET_TRUSTED_PATIENTS_REQUEST,
  GET_TRUSTED_PATIENTS_SUCCESS,
  GET_TRUSTED_PATIENTS_FAILURE,
} from "../actions/patientTrustedlistforLabAction";

const initialState = {
  loading: false,
  statusCode: null,
  error: null,
  trustedMedicalLabs: null,
  trustedPatients: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAB_TO_PATIENT_TRUSTED_LIST_REQUEST:
    case REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_REQUEST:
    case GET_TRUSTED_MEDICAL_LAB_REQUEST:
    case GET_TRUSTED_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        statusCode: null,
      };
    case ADD_LAB_TO_PATIENT_TRUSTED_LIST_SUCCESS:
    case REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        statusCode: action.statusCode,
      };
    case GET_TRUSTED_MEDICAL_LAB_SUCCESS:
      return {
        ...state,
        loading: false,
        trustedMedicalLabs: action.payload,
        statusCode: action.statusCode,
      };
    case GET_TRUSTED_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        trustedPatients: action.payload,
        statusCode: action.statusCode,
      };
    case ADD_LAB_TO_PATIENT_TRUSTED_LIST_FAILURE:
    case REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_FAILURE:
    case GET_TRUSTED_MEDICAL_LAB_FAILURE:
    case GET_TRUSTED_PATIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        statusCode: action.statusCode,
      };
    default:
      return state;
  }
};

export default reducer;
