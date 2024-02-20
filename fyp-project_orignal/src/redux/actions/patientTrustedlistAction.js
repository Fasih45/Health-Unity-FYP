import axios from "axios";

// Action types
export const ADD_DOCTOR_TO_LIST_REQUEST = "ADD_DOCTOR_TO_LIST_REQUEST";
export const ADD_DOCTOR_TO_LIST_SUCCESS = "ADD_DOCTOR_TO_LIST_SUCCESS";
export const ADD_DOCTOR_TO_LIST_FAILURE = "ADD_DOCTOR_TO_LIST_FAILURE";

export const REMOVE_DOCTOR_FROM_LIST_REQUEST =
  "REMOVE_DOCTOR_FROM_LIST_REQUEST";
export const REMOVE_DOCTOR_FROM_LIST_SUCCESS =
  "REMOVE_DOCTOR_FROM_LIST_SUCCESS";
export const REMOVE_DOCTOR_FROM_LIST_FAILURE =
  "REMOVE_DOCTOR_FROM_LIST_FAILURE";

export const GET_TRUSTED_DOCTORS_LIST_REQUEST =
  "GET_TRUSTED_DOCTORS_LIST_REQUEST";
export const GET_TRUSTED_DOCTORS_LIST_SUCCESS =
  "GET_TRUSTED_DOCTORS_LIST_SUCCESS";
export const GET_TRUSTED_DOCTORS_LIST_FAILURE =
  "GET_TRUSTED_DOCTORS_LIST_FAILURE";

// Action creators for adding a doctor to the trusted list
export const addDoctorToListRequest = () => ({
  type: ADD_DOCTOR_TO_LIST_REQUEST,
});

export const addDoctorToListSuccess = (statusCode) => ({
  type: ADD_DOCTOR_TO_LIST_SUCCESS,
  statuscode: statusCode,
});

export const addDoctorToListFailure = (error, statusCode) => ({
  type: ADD_DOCTOR_TO_LIST_FAILURE,
  payload: error,
  statuscode: statusCode,
});

export const addDoctorToList = (patientUsername, doctorName) => {
  return async (dispatch) => {
    dispatch(addDoctorToListRequest());

    let token = localStorage.getItem("patient");
    const parsedtoken = token ? JSON.parse(token) : [];

    try {
      const response = await axios.post(
        `http://localhost:5000/list/add-doctor/${patientUsername}`,
        { doctorName: doctorName },
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      dispatch(addDoctorToListSuccess(response.status));
    } catch (error) {
      dispatch(addDoctorToListFailure(error.message, error.response.status));
    }
  };
};

// Action creators for removing a doctor from the trusted list
export const removeDoctorFromListRequest = () => ({
  type: REMOVE_DOCTOR_FROM_LIST_REQUEST,
});

export const removeDoctorFromListSuccess = (statusCode) => ({
  type: REMOVE_DOCTOR_FROM_LIST_SUCCESS,
  statuscode: statusCode,
});

export const removeDoctorFromListFailure = (error, statusCode) => ({
  type: REMOVE_DOCTOR_FROM_LIST_FAILURE,
  payload: error,
  statuscode: statusCode,
});

export const removeDoctorFromList = (patientUsername, doctorName) => {
  return async (dispatch) => {
    dispatch(removeDoctorFromListRequest());
    let token = localStorage.getItem("patient");
    const parsedtoken = token ? JSON.parse(token) : [];

    try {
      const response = await axios.post(
        `http://localhost:5000/list/remove-doctor/${patientUsername}`,
        { doctorName: doctorName },
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      dispatch(removeDoctorFromListSuccess(response.status));
    } catch (error) {
      dispatch(
        removeDoctorFromListFailure(error.message, error.response.status)
      );
    }
  };
};

// Action creators for getting the list of trusted doctors
export const getTrustedDoctorsListRequest = () => ({
  type: GET_TRUSTED_DOCTORS_LIST_REQUEST,
});

export const getTrustedDoctorsListSuccess = (trustedDoctors, statusCode) => ({
  type: GET_TRUSTED_DOCTORS_LIST_SUCCESS,
  payload: trustedDoctors,
  statuscode: statusCode,
});

export const getTrustedDoctorsListFailure = (error, statusCode) => ({
  type: GET_TRUSTED_DOCTORS_LIST_FAILURE,
  payload: error,
  statuscode: statusCode,
});

export const getTrustedDoctorsList = (patientUsername) => {
  return async (dispatch) => {
    dispatch(getTrustedDoctorsListRequest());
    let token = localStorage.getItem("patient");
    const parsedtoken = token ? JSON.parse(token) : [];

    try {
      const response = await axios.get(
        `http://localhost:5000/list/get-trusted-doctors/${patientUsername}`,
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      dispatch(
        getTrustedDoctorsListSuccess(
          response.data.trustedDoctors,
          response.status
        )
      );
    } catch (error) {
      dispatch(
        getTrustedDoctorsListFailure(error.message, error.response.status)
      );
    }
  };
};
