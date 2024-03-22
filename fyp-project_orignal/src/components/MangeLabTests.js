import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileMedicalLab } from "../redux/actions/searcProfileAction";
const MangeLabTests = () => {
  const [testrec, settestrec] = useState([
    { name: "Blood", cost: "300" },
    { name: "X-rays", cost: "300" },
  ]);
  const [editIndex, setEditIndex] = useState(null); // State to track the index being edited
  const [error, setError] = useState("");
  const [flagerror, setflagerror] = useState(false);
  const [allowaddtest, setallowaddtest] = useState(false);
  const [Addtestrec, setAddtestrec] = useState([]);
  const [Shownewtable, setShownewtable] = useState(false);
  const { user, username } = useParams();
  const dispatch = useDispatch();
  const { singleprofileMedicalLab, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  useEffect(() => {
    setError("");
  }, [testrec, Addtestrec]);

  useEffect(() => {
    dispatch(getProfileMedicalLab(username));
  }, []);
  useEffect(() => {
    console.log("list", singleprofileMedicalLab);
  }, [singleprofileMedicalLab]);
  const addFunction = () => {
    // console.log('testrec', testrec);
    setallowaddtest(true);
    setShownewtable(true);
    const allTests = [...testrec, ...Addtestrec];
    const duplicates = allTests.filter((item, index) =>
      allTests.some((elem, idx) => elem.name === item.name && idx !== index)
    );
    if (duplicates.length > 0) {
      setError("Test Name Already Exit.");
      setflagerror(true);
    } else if (
      Addtestrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      )
    ) {
      const newTestIndex = testrec.length;
      setAddtestrec((prevData) => [
        ...prevData,
        {
          name: "",
          cost: "",
        },
      ]);
      setEditIndex(newTestIndex);
      setError("");
      setflagerror(false);
    } else {
      setError("Please fill in all fields before adding a new test.");
      setflagerror(true);
    }
  };

  const deleteFunction = (index, flageArray) => {
    setallowaddtest(true);
    flageArray
      ? settestrec((prevData) => {
          const newData = [...prevData];
          newData.splice(index, 1);
          return newData;
        })
      : setAddtestrec((prevData) => {
          const newData = [...prevData];
          newData.splice(index, 1);
          return newData;
        });
  };

  const handleChangetest = (e, index) => {
    setallowaddtest(true);
    const { name, value } = e.target;
    const updatedFormData = [...testrec];

    // Ensure that "cost" is a number
    if (name === "cost" && isNaN(Number(value))) {
      setError("Cost must be a number.");
      return;
    } else {
      setError("");
    }

    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value,
    };
    settestrec(updatedFormData);
    setError("");
  };

  const handleChangeNewtest = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...Addtestrec];

    // Ensure that "cost" is a number
    if (name === "cost" && isNaN(Number(value))) {
      setError("Cost must be a number.");
      return;
    } else {
      setError("");
    }

    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value,
    };
    setAddtestrec(updatedFormData);
    setError("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSubmit = () => {
    const duplicates = testrec.filter((item, index) =>
      testrec.some((elem, idx) => elem.name === item.name && idx !== index)
    );
    if (duplicates.length > 0) {
      setError("Test Name Already Exit.");
      setflagerror(true);
    } else if (
      testrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      ) &&
      Addtestrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      )
    ) {
      console.log("testrec", testrec);
      console.log("NewAdded Test", Addtestrec);
      setShownewtable(false);

      setallowaddtest(false);
    } else {
      setError("Please fill in all fields..");
      setflagerror(true);
    }
  };

  return (
    <>
      <div className="bg-white p-6  min-h-full rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lab Details
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div>
            <p className="text-lg font-semibold text-gray-800">Lab Name:</p>
            <p className="text-sm text-gray-600">Labname</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Lab Lis:</p>
            <p className="text-sm text-gray-600">Labname</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Lab Name:</p>
            <p className="text-sm text-gray-600">Labname</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Lab Name:</p>
            <p className="text-sm text-gray-600">Labname</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-10 text-gray-800 mb-4">
          Tests Details
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />

        {/* Table  */}

        <div class="p-4">
          <label for="table-search" class="sr-only">
            Search
          </label>
          {/* Serach Bar  */}
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        {/* Show error if Exist  */}
        <div className="mt-8 mb-3 text-center">
          {flagerror && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="-mx-4  px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                {/* Table header */}
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cost
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!Shownewtable
                  ? testrec.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b hover:bg-orange-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={item.name}
                            className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            onChange={(e) => handleChangetest(e, index)}
                            disabled={editIndex !== index} // Disable input if not in edit mode
                          />
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            name="cost"
                            placeholder="cost"
                            value={item.cost}
                            className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            onChange={(e) => handleChangetest(e, index)}
                            disabled={editIndex !== index} // Disable input if not in edit mode
                          />
                        </td>
                        <td className="p-3 px-5 flex justify-end">
                          <button
                            onClick={() => handleEdit(index)} // Set edit mode for this index
                            type="button"
                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Edit
                          </button>
                          {testrec.length > 1 && (
                            <button
                              onClick={() => deleteFunction(index, true)}
                              type="button"
                              className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  : Addtestrec.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b hover:bg-orange-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={item.name}
                            className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            onChange={(e) => handleChangeNewtest(e, index)}
                          />
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            name="cost"
                            placeholder="cost"
                            value={item.cost}
                            className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            onChange={(e) => handleChangeNewtest(e, index)}
                          />
                        </td>
                        <td className="p-3 px-5 flex justify-end">
                          {Addtestrec.length > 1 && (
                            <button
                              onClick={() => deleteFunction(index, false)}
                              type="button"
                              className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-5">
          <button
            type="button"
            onClick={addFunction}
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Test
          </button>
          {allowaddtest ? (
            <button
              type="button"
              onClick={handleSubmit}
              class="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Save test Changes
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MangeLabTests;
