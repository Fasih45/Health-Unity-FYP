import axios from "axios";
// Action types
export const GET_DOCTOR_PROFILES = "GET_DOCTOR_PROFILES";
export const DOCTOR_PROFILES_SUCCESS = "DOCTOR_PROFILES_SUCCESS";
export const DOCTOR_PROFILE_SUCCESS = "DOCTOR_PROFILE_SUCCESS"; ///for single profile
export const Medical_PROFILE_SUCCESS = "Medical_PROFILE_SUCCESS"; ///for single profile
export const DOCTOR_PROFILES_FAILURE = "DOCTOR_PROFILES_FAILURE";
export const RESET_DOCTOR_PROFILES = "RESET_DOCTOR_PROFILES";

// Action creators
export const getDoctorProfilesRequest = () => ({
  type: GET_DOCTOR_PROFILES,
});

export const doctorProfilesSuccess = (
  profiles,
  currentPage,
  totalItems,
  statusCode
) => ({
  type: DOCTOR_PROFILES_SUCCESS,
  payload: { profiles, currentPage, totalItems },
  statuscode: statusCode,
});

export const doctorProfileSuccess = (
  profiles,
  currentPage,
  totalItems,
  statusCode
) => ({
  type: DOCTOR_PROFILE_SUCCESS,
  statuscode: statusCode,
  singleprofile: profiles,
});
export const medicalLabsProfileSuccess = (
  profiles,
  currentPage,
  totalItems,
  statusCode
) => ({
  type: Medical_PROFILE_SUCCESS,
  statuscode: statusCode,
  singleprofileMedicalLab: profiles,
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
export const getProfiles = (user, params, typeOf) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());
    let token = localStorage.getItem(user);
    const parsedtoken = token ? JSON.parse(token) : [];
    try {
      const response = await axios.post(
        `http://localhost:5000/profile/${typeOf}Profiles`,
        params,
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
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
          dispatch(
            doctorProfilesFailure(`Error: ${status} Message:${message}`, status)
          );
        }
      } else {
        dispatch(doctorProfilesFailure("Network error", 500));
      }
    }
  };
};
export const getProfileDoc = (params) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());

    try {
      const response = await axios.get(
        `http://localhost:5000/profile/doctorProfile/${params}`
      );
      const jsonResponse = response.data;

      dispatch(doctorProfileSuccess(jsonResponse, 1, 1, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfilesFailure(message, status));
        } else {
          dispatch(
            doctorProfilesFailure(
              `Error: ${status} Message: ${message}`,
              status
            )
          );
        }
      } else {
        dispatch(doctorProfilesFailure("Network error", 500));
      }
    }
  };
};
export const getProfileMedicalLab = (params) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());

    try {
      const response = await axios.get(
        `http://localhost:5000/profile/medicalLabProfile/${params}`
      );
      const jsonResponse = response.data;

      dispatch(medicalLabsProfileSuccess(jsonResponse, 1, 1, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfilesFailure(message, status));
        } else {
          dispatch(
            doctorProfilesFailure(
              `Error: ${status} Message: ${message}`,
              status
            )
          );
        }
      } else {
        dispatch(doctorProfilesFailure("Network error", 500));
      }
    }
  };
};
export const getProfileMedicalLabforLabs = (params) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());
    let token = localStorage.getItem("medical_labs");
    const parsedtoken = token ? JSON.parse(token) : [];
    try {
      const response = await axios.get(
        `http://localhost:5000/profile/medicalLabProfileforlabs/${params}`,
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      const jsonResponse = response.data;

      dispatch(medicalLabsProfileSuccess(jsonResponse, 1, 1, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfilesFailure(message, status));
        } else {
          dispatch(
            doctorProfilesFailure(
              `Error: ${status} Message: ${message}`,
              status
            )
          );
        }
      } else {
        dispatch(doctorProfilesFailure("Network error", 500));
      }
    }
  };
};

export const editProfileMedicalLab = (params, test) => {
  return async (dispatch) => {
    dispatch(getDoctorProfilesRequest());

    try {
      const response = await axios.post(
        `http://localhost:5000/profile/editMedicalLabProfile/${params}`,
        { test: test }
      );
      const jsonResponse = response.data;

      dispatch(medicalLabsProfileSuccess(jsonResponse, 1, 1, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(doctorProfilesFailure(message, status));
        } else {
          dispatch(
            doctorProfilesFailure(
              `Error: ${status} Message: ${message}`,
              status
            )
          );
        }
      } else {
        dispatch(doctorProfilesFailure("Network error", 500));
      }
    }
  };
};
