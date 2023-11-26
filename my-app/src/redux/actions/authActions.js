import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user,code) => ({
  type: LOGIN_SUCCESS,
  payload: user,
  statuscode:code
});

export const loginFailure = (error,code) => ({
  type: LOGIN_FAILURE,
  payload: error,
  statuscode:code

});
export const setMessage = (message) => {
    return (dispatch) => {
      dispatch({ type: 'SET_MESSAGE', payload: message });
    };
  };
  export const login = (credentials,user) => {
    return async (dispatch) => {
      dispatch(loginRequest());
      console.log(user);
      try {
        const response = await axios.post(`http://localhost:5000/users/${user}/login`, credentials);
        const jsonResponse = response.data;
        localStorage.setItem("token", JSON.stringify(jsonResponse.token));
        dispatch(loginSuccess(jsonResponse,200));
        

      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          const message = error.response.data.error;
          

          console.log(error);
  
          if (status === 401) {
            dispatch(loginFailure(message,status));
          } else if (status === 404) {
            dispatch(loginFailure(message,status));
          } else {
            dispatch(loginFailure(`Error: ${status} Message:${message}`));
          }
        } else {
          dispatch(loginFailure('Network error'));
        }
      }
    };
  };
  export const verification = (credentials,user) => {
    return async (dispatch) => {
      dispatch(loginRequest());
      try {
        const response = await axios.post(`http://localhost:5000/users/${user}/verify`, credentials);
        const jsonResponse = response.data;
        localStorage.setItem("token", JSON.stringify(jsonResponse.token));
        dispatch(loginSuccess(jsonResponse,200));
        console.log('done');

      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          const message = error.response.data.error;
          

          console.log(error);
  
          if (status === 400) {
            dispatch(loginFailure(message,status));
          } else if (status === 404) {
            dispatch(loginFailure(message,status));
          } else {
            dispatch(loginFailure(`Error: ${status} Message:${message}`));
          }
        } else {
          dispatch(loginFailure('Network error'));
        }
      }
    };
  };