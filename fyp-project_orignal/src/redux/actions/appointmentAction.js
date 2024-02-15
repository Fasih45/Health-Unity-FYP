import axios from "axios";

// Action types
export const GET_APPOINTMENTS = "GET_APPOINTMENTS";
export const APPOINTMENTS_SUCCESS = "APPOINTMENTS_SUCCESS";
export const APPOINTMENTS_FAILURE = "APPOINTMENTS_FAILURE";

// Action creators
export const getAppointmentsRequest = () => ({
  type: GET_APPOINTMENTS,
});

export const appointmentsSuccess = (appointments, statusCode) => ({
  type: APPOINTMENTS_SUCCESS,
  payload: appointments,
  statuscode: statusCode,
});

export const appointmentsFailure = (error, statusCode) => ({
  type: APPOINTMENTS_FAILURE,
  payload: error,
  statuscode: statusCode,
});

// Thunk to get appointments
export const getAppointments = (user, username, page, status, name) => {
  return async (dispatch) => {
    dispatch(getAppointmentsRequest());
    console.log(        {
      name: name,
      status: status,
      page: page,
    });
    let token = localStorage.getItem(user);
    const parsedtoken = token ? JSON.parse(token) : [];
    try {
      const response = await axios.post(
        `http://localhost:5000/appointments/${user}/${username}`,
        {
          name: name,
          status: status,
          page: page,
        },
        {
          headers: {
            Authorization: `Bearer ${parsedtoken}`,
          },
        }
      );
      const jsonResponse = response.data;
      dispatch(appointmentsSuccess(jsonResponse, 200));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data;

        if (status === 404) {
          dispatch(appointmentsFailure(message, status));
        } else {
          dispatch(
            appointmentsFailure(`Error: ${status} Message:${message}`, status)
          );
        }
      } else {
        dispatch(appointmentsFailure("Network error", 500));
      }
    }
  };
};

// Thunk to register an appointment
export const registerAppointment = (appointmentDetails) => {
  return async (dispatch) => {
    dispatch(getAppointmentsRequest());

    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/register",
        appointmentDetails
      );
      const jsonResponse = response.data;
      dispatch(appointmentsSuccess(jsonResponse, 201));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.message;
        dispatch(appointmentsFailure(message, status));
      } else {
        dispatch(appointmentsFailure("Network error", 500));
      }
    }
  };
};
export const registerAppointmentTiming = (appointmentDetails) => {
  return async (dispatch) => {
    dispatch(getAppointmentsRequest());

    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/registerTiming",
        appointmentDetails
      );
      const jsonResponse = response.data;
      dispatch(appointmentsSuccess(jsonResponse, 201));
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.message;
        dispatch(appointmentsFailure(message, status));
      } else {
        dispatch(appointmentsFailure("Network error", 500));
      }
    }
  };
};
export const registerAppointmentCheck = (appointmentDetails) => {
  return async (dispatch) => {
    dispatch(getAppointmentsRequest());
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/registerCheck",
        appointmentDetails
      );
      const jsonResponse = response.data;
      return 200;
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.message;
        dispatch(appointmentsFailure(message, status));
        return 409;
      } else {
        dispatch(appointmentsFailure("Network error", 500));
        return 500;
      }
    }
  };
};

export const registerAppointmentTimingCheck = (appointmentDetails) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/registerTimingCheck",
        appointmentDetails
      );
      const jsonResponse = response.data;
      return 200;
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.message;
        return 409;
      } else {
        dispatch(appointmentsFailure("Network error", 500));
        return 500;
      }
    }
  };
};
