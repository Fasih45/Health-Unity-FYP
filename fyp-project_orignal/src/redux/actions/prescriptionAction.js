import axios from "axios";

// Action types
export const CREATE_PRESCRIPTION = "CREATE_PRESCRIPTION";
export const GET_PRESCRIPTION = "GET_PRESCRIPTION";
export const UPDATE_PRESCRIPTION = "UPDATE_PRESCRIPTION";
export const DELETE_PRESCRIPTION = "DELETE_PRESCRIPTION";
export const PRESCRIPTION_SUCCESS = "PRESCRIPTION_SUCCESS";
export const PRESCRIPTION_FAILURE = "PRESCRIPTION_FAILURE";
export const SetKeypair = "SetKeypair";


// Action creators
export const createPrescriptionRequest = () => ({
  type: CREATE_PRESCRIPTION,
});

export const getPrescriptionRequest = () => ({
  type: GET_PRESCRIPTION,
});

export const updatePrescriptionRequest = () => ({
  type: UPDATE_PRESCRIPTION,
});

export const deletePrescriptionRequest = () => ({
  type: DELETE_PRESCRIPTION,
});

export const prescriptionSuccess = (prescription, statusCode) => ({
  type: PRESCRIPTION_SUCCESS,
  payload: prescription,
  statuscode: statusCode,
});

export const prescriptionFailure = (error, statusCode) => ({
  type: PRESCRIPTION_FAILURE,
  payload: error,
  statuscode: statusCode,
});

export const setkeypair = (value) => ({
  type: SetKeypair,
  value:value 
});

// Thunk to create a prescription
export const createPrescription = (prescriptionDetails) => {
  return async (dispatch) => {
    dispatch(createPrescriptionRequest());

    try {
      const response = await axios.post("http://localhost:5000/patient/prescriptions", prescriptionDetails);
      const jsonResponse = response.data;
      dispatch(prescriptionSuccess(jsonResponse, 201));
    } catch (error) {
      dispatch(prescriptionFailure(error.message, error.response.status));
    }
  };
};

// Thunk to get a prescription by ID
export const getPrescription = (id,page) => {
  return async (dispatch) => {
    dispatch(getPrescriptionRequest());

    try {
        
      const response = await axios.get(`http://localhost:5000/patient/prescriptions/${id}/${page}`);
      const jsonResponse = response.data;
      dispatch(prescriptionSuccess(jsonResponse, 200));
    } catch (error) {
      dispatch(prescriptionFailure(error.message, error.response.status));
    }
  };
};

// Thunk to update a prescription by ID
export const updatePrescription = (id, prescriptionDetails) => {
  return async (dispatch) => {
    dispatch(updatePrescriptionRequest());

    try {
      const response = await axios.post(`/api/prescriptions/${id}`, prescriptionDetails);
      const jsonResponse = response.data;
      dispatch(prescriptionSuccess(jsonResponse, 200));
    } catch (error) {
      dispatch(prescriptionFailure(error.message, error.response.status));
    }
  };
};

// Thunk to delete a prescription by ID
export const deletePrescription = (id) => {
  return async (dispatch) => {
    dispatch(deletePrescriptionRequest());

    try {
      await axios.delete(`/api/prescriptions/${id}`);
      dispatch(prescriptionSuccess(null, 204));
    } catch (error) {
      dispatch(prescriptionFailure(error.message, error.response.status));
    }
  };
};
