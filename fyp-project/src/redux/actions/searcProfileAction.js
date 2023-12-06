import axios from 'axios';
// Action types
export const GET_DOCTOR_PROFILES = 'GET_DOCTOR_PROFILES';
export const DOCTOR_PROFILES_SUCCESS = 'DOCTOR_PROFILES_SUCCESS';
export const DOCTOR_PROFILES_FAILURE = 'DOCTOR_PROFILES_FAILURE';
export const RESET_DOCTOR_PROFILES = 'RESET_DOCTOR_PROFILES';

// Action creators
export const getDoctorProfilesRequest = () => ({
  type: GET_DOCTOR_PROFILES,
});

export const doctorProfilesSuccess = (profiles, currentPage, totalItems, statusCode) => ({
  type: DOCTOR_PROFILES_SUCCESS,
  payload: { profiles, currentPage, totalItems },
  statuscode: statusCode,
});

export const doctorProfilesFailure = (error, statusCode) => ({
  type: DOCTOR_PROFILES_FAILURE,
  payload: error,
  statuscode: statusCode,
});

export const resetDoctorProfiles = () => ({
  type: RESET_DOCTOR_PROFILES,
});

// Thunk to get doctor profiles
export const getProfiles = (params) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());

    try {
      const response = await axios.post(`http://localhost:5000/profile/doctorProfiles`, params);
      const jsonResponse = response.data;
      const { profiles, currentPage, totalItems } = jsonResponse;

      dispatch(doctorProfilesSuccess(profiles, currentPage, totalItems, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfilesFailure(message, status));
        } else {
          dispatch(doctorProfilesFailure(`Error: ${status} Message:${message}`, status));
        }
      } else {
        dispatch(doctorProfilesFailure('Network error', 500));
      }
    }
  };
};
