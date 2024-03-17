// actions.js
import axios from "axios";

// Action types for adding a lab to the trusted list for a patient
export const ADD_LAB_TO_PATIENT_TRUSTED_LIST_REQUEST =
  "ADD_LAB_TO_PATIENT_TRUSTED_LIST_REQUEST";
export const ADD_LAB_TO_PATIENT_TRUSTED_LIST_SUCCESS =
  "ADD_LAB_TO_PATIENT_TRUSTED_LIST_SUCCESS";
export const ADD_LAB_TO_PATIENT_TRUSTED_LIST_FAILURE =
  "ADD_LAB_TO_PATIENT_TRUSTED_LIST_FAILURE";

// Action types for removing a lab from the trusted list for a patient
export const REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_REQUEST =
  "REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_REQUEST";
export const REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_SUCCESS =
  "REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_SUCCESS";
export const REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_FAILURE =
  "REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_FAILURE";

// Action types for getting the list of trusted medical labs for a patient
export const GET_TRUSTED_MEDICAL_LAB_REQUEST =
  "GET_TRUSTED_MEDICAL_LAB_REQUEST";
export const GET_TRUSTED_MEDICAL_LAB_SUCCESS =
  "GET_TRUSTED_MEDICAL_LAB_SUCCESS";
export const GET_TRUSTED_MEDICAL_LAB_FAILURE =
  "GET_TRUSTED_MEDICAL_LAB_FAILURE";

// Action types for getting the list of trusted patients for a medical lab
export const GET_TRUSTED_PATIENTS_REQUEST = "GET_TRUSTED_PATIENTS_REQUEST";
export const GET_TRUSTED_PATIENTS_SUCCESS = "GET_TRUSTED_PATIENTS_SUCCESS";
export const GET_TRUSTED_PATIENTS_FAILURE = "GET_TRUSTED_PATIENTS_FAILURE";

// Action creators for adding a lab to the trusted list for a patient
export const addLabToPatientTrustedListRequest = () => ({
  type: ADD_LAB_TO_PATIENT_TRUSTED_LIST_REQUEST,
});

export const addLabToPatientTrustedListSuccess = (statusCode) => ({
  type: ADD_LAB_TO_PATIENT_TRUSTED_LIST_SUCCESS,
  statusCode,
});

export const addLabToPatientTrustedListFailure = (error, statusCode) => ({
  type: ADD_LAB_TO_PATIENT_TRUSTED_LIST_FAILURE,
  payload: error,
  statusCode,
});

export const addLabToPatientTrustedList = (username, medicalLabUsername) => {
  return async (dispatch) => {
    dispatch(addLabToPatientTrustedListRequest());
    try {
      const response = await axios.post(
        `http://localhost:5000/list/add-lab/${username}/${medicalLabUsername}`
      );
      dispatch(addLabToPatientTrustedListSuccess(201));
    } catch (error) {
      dispatch(
        addLabToPatientTrustedListFailure(error.message, error.response.status)
      );
    }
  };
};

// Action creators for removing a lab from the trusted list for a patient
export const removeLabFromPatientTrustedListRequest = () => ({
  type: REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_REQUEST,
});

export const removeLabFromPatientTrustedListSuccess = (statusCode) => ({
  type: REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_SUCCESS,
  statusCode,
});

export const removeLabFromPatientTrustedListFailure = (error, statusCode) => ({
  type: REMOVE_LAB_FROM_PATIENT_TRUSTED_LIST_FAILURE,
  payload: error,
  statusCode,
});

export const removeLabFromPatientTrustedList = (
  username,
  medicalLabUsername
) => {
  return async (dispatch) => {
    dispatch(removeLabFromPatientTrustedListRequest());
    try {
      const response = await axios.post(
        `http://localhost:5000/list/remove-lab/${username}/${medicalLabUsername}`
      );
      dispatch(removeLabFromPatientTrustedListSuccess(201));
    } catch (error) {
      dispatch(
        removeLabFromPatientTrustedListFailure(
          error.message,
          error.response.status
        )
      );
    }
  };
};

// Action creators for getting the list of trusted medical labs for a patient
export const getTrustedMedicalLabRequest = () => ({
  type: GET_TRUSTED_MEDICAL_LAB_REQUEST,
});

export const getTrustedMedicalLabSuccess = (data) => ({
  type: GET_TRUSTED_MEDICAL_LAB_SUCCESS,
  payload: data,
});

export const getTrustedMedicalLabFailure = (error, statusCode) => ({
  type: GET_TRUSTED_MEDICAL_LAB_FAILURE,
  payload: error,
  statusCode,
});

export const getTrustedMedicalLab = (username) => {
  return async (dispatch) => {
    dispatch(getTrustedMedicalLabRequest());
    let token = localStorage.getItem("patient");
    const parsedtoken = token ? JSON.parse(token) : [];

    try {
      const response = await axios.get(
        `http://localhost:5000/list/get-trusted-medicalLab/${username}`,
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      dispatch(getTrustedMedicalLabSuccess(response.data));
    } catch (error) {
      dispatch(
        getTrustedMedicalLabFailure(error.message, error.response.status)
      );
    }
  };
};

// Action creators for getting the list of trusted patients for a medical lab
export const getTrustedPatientsRequest = () => ({
  type: GET_TRUSTED_PATIENTS_REQUEST,
});

export const getTrustedPatientsSuccess = (data) => ({
  type: GET_TRUSTED_PATIENTS_SUCCESS,
  payload: data,
});

export const getTrustedPatientsFailure = (error, statusCode) => ({
  type: GET_TRUSTED_PATIENTS_FAILURE,
  payload: error,
  statusCode,
});

export const getTrustedPatients = (username) => {
  return async (dispatch) => {
    dispatch(getTrustedPatientsRequest());
    try {
      const response = await axios.get(`/api/get-trusted-patients/${username}`);
      dispatch(getTrustedPatientsSuccess(response.data));
    } catch (error) {
      dispatch(getTrustedPatientsFailure(error.message, error.response.status));
    }
  };
};
