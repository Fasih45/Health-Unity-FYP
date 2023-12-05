import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (sucessMessage) => ({
  type: REGISTER_SUCCESS,
  payload: sucessMessage,
});

export const registerFailure = (errorMessage) => ({
  type: REGISTER_FAILURE,
  payload: errorMessage,
});
export const register = (credentials, user) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    if (credentials.cnic) {
      credentials.cnic = parseInt(credentials.cnic, 10);
    }

    console.log(credentials);
    try {
      const response = await axios.post(
        `http://localhost:5000/users/${user}/register`,
        credentials
      );
      const jsonResponse = response.data;
      dispatch(registerSuccess(jsonResponse.message));
      console.log(jsonResponse.message)
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        const message = error.response.data.error;

        if (status === 400) {//bad request
          dispatch(registerFailure(message));
        } else {
          dispatch(registerFailure(`Error: ${status} Message:${message}`));
        }
      } else {
        dispatch(registerFailure("Network error"));
      }
    }
  };
};
