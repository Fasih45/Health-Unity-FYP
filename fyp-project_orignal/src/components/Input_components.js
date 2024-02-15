import React from "react";

export default function Input_components({
  dataform,
  handle,
  index,
  deleteFunction,
  totalForms,
  errorsdata,
}) {
  return (
    <>
      <div className="col-auto mb-4">
        <label htmlFor="inputUserName" className="visually-hidden">
          User Name
        </label>
        <input
          type="text"
          className="form-control border rounded py-2 px-3"
          id="inputUserName"
          name="userName"
          placeholder="User Name"
          value={dataform.userName}
          onChange={handle}
        />
        {errorsdata[index].userName && (
          <span className="text-danger">Username is required</span>
        )}
      </div>
      <div className="col-auto mb-4">
        <label htmlFor="inputEmail" className="visually-hidden">
          Email
        </label>
        <input
          type="email"
          className="form-control border rounded py-2 px-3"
          id="inputEmail"
          name="email"
          placeholder="Email"
          value={dataform.email}
          onChange={handle}
        />
        {errorsdata[index].email && (
          <span className="text-danger">Email is required</span>
        )}
      </div>
      <div className="col-auto mb-4">
        <label htmlFor="inputPhone" className="visually-hidden">
          Phone
        </label>
        <input
          type="number"
          className="form-control border rounded py-2 px-3"
          id="inputPhone"
          name="phone"
          placeholder="Phone"
          value={dataform.phone}
          onChange={handle}
        />
        {errorsdata[index].phone && (
          <span className="text-danger">Phone no. is required</span>
        )}
      </div>

      <div className="col-1 mb-4">
        {totalForms > 1 ? (
          <button
            onClick={deleteFunction}
            type="button"
            className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        ) : null}
      </div>
    </>
  );
}
