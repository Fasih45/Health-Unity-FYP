import axios from 'axios';

// Action types
export const GET_DOCTOR_PROFILE = 'GET_DOCTOR_PROFILE';
export const DOCTOR_PROFILE_SUCCESS = 'DOCTOR_PROFILE_SUCCESS';
export const DOCTOR_PROFILE_FAILURE = 'DOCTOR_PROFILE_FAILURE';

// Action creators
export const getDoctorProfileRequest = () => ({
  type: GET_DOCTOR_PROFILE,
});

export const doctorProfileSuccess = (user, statusCode) => ({
  type: DOCTOR_PROFILE_SUCCESS,
  payload: user,
  statuscode: statusCode,
});

export const doctorProfileFailure = (error, statusCode) => ({
  type: DOCTOR_PROFILE_FAILURE,
  payload: error,
  statuscode: statusCode,
});

// Thunk to get doctor profile
export const getProfile = (user,username) => {
  return async (dispatch) => {
    dispatch(getDoctorProfileRequest());

    try {
      const response = await axios.get(`http://localhost:5000/profile/${user}/${username}`);
      const jsonResponse = response.data;
      dispatch(doctorProfileSuccess(jsonResponse, 200));

    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfileFailure(message, status));
        } else {
          dispatch(doctorProfileFailure(`Error: ${status} Message:${message}`, status));
        }
      } else {
        dispatch(doctorProfileFailure('Network error'));
      }
    }
  };
};

// Thunk to register doctor profile
export const registerDoctorProfile = (credentials) => {
  return async (dispatch) => {
    // Dispatch an action indicating the start of the registration process
    dispatch(getDoctorProfileRequest());

    try {
      // Make a POST request to register the doctor profile
      const response = await axios.post(`http://localhost:5000/profile/doctor/register`, credentials);

      // Handle the successful registration
      const jsonResponse = response.data;
      dispatch(doctorProfileSuccess(jsonResponse, 201));

    } catch (error) {
      // Handle registration failure
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.error;

        dispatch(doctorProfileFailure(`Error: ${status} Message:${message}`, status));
      } else {
        dispatch(doctorProfileFailure('Network error',500));
      }
    }
  };
};
