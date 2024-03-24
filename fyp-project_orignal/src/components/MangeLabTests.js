import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileMedicalLab } from "../redux/actions/searcProfileAction";
import Swal from "sweetalert2";
const MangeLabTests = () => {
  const [editIndex, setEditIndex] = useState(null); // State to track the index being edited
  const [error, setError] = useState("");
  const [flagerror, setflagerror] = useState(false);
  const [allowaddtest, setallowaddtest] = useState(false);
  const [Addtestrec, setAddtestrec] = useState([]);
  const [Shownewtable, setShownewtable] = useState(false);
  const { user, username } = useParams();
  const [labeinfo, setlabinfo] = useState();
  const dispatch = useDispatch();
  const { singleprofileMedicalLab, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  const [testrec, settestrec] = useState([]);
  useEffect(() => {
    if (singleprofileMedicalLab) {
      settestrec(singleprofileMedicalLab.test);
      setlabinfo(singleprofileMedicalLab)     
    }
  }, [singleprofileMedicalLab]);

  useEffect(() => {
    console.log('testrec in useEffect :', testrec);
  }, [testrec]);

 

  // Paginaion code
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const recordsPerPage = 5;
  const [currentRecords, setCurrentRecords] = useState([]);
  const [addtestflag, setAddtestflag] = useState(false);

  useEffect(() => {
    if (currentRecords)
      console.log("Current Records:", currentRecords);
  }, [currentRecords]);

  useEffect(() => {
    // Filtered records based on search
    // console.log("Allow useEffect outer :", allowaddtest);
    if (!allowaddtest) {
      // console.log("Allow Add Test inner:", allowaddtest);
      // console.log("Testrec useEffect:", testrec);
      const filteredRecords = testrec?.filter((item) => {
        return search === "" ? true : item.name.toLowerCase().includes(search.toLowerCase());
      });

      // Calculate total pages
      const totalRecords = filteredRecords?.length;
      // console.log("Total Records:", totalRecords);
      const totalPagesCount = Math.ceil(totalRecords / recordsPerPage);
      // console.log("Total Pages:", totalPagesCount);
      setTotalPages(totalPagesCount);

      // Set current records for the current page
      const indexOfLastRecord = currentPage * recordsPerPage;
      // console.log("Index of Last Record:", indexOfLastRecord);

      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      // console.log("Index of First Record:", indexOfFirstRecord);
      const currentRecordsSlice = filteredRecords?.slice(indexOfFirstRecord, indexOfLastRecord);
      // console.log("Current Records Slice:", currentRecordsSlice);
      setCurrentRecords(currentRecordsSlice);
      
    }
  }, [testrec, allowaddtest, search, currentPage, recordsPerPage]);

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setError("");
  }, [testrec, Addtestrec]);

  useEffect(() => {
    dispatch(getProfileMedicalLab(username));
  }, []);

  const addFunction = () => {
    setallowaddtest(true);
    setShownewtable(true);
    const duplicates = Addtestrec?.filter(addTest => {
      return testrec?.some(test => test.name.toLowerCase() === addTest.name.toLowerCase());
    });
    const repeatedname = Addtestrec.filter((item, index) =>
      Addtestrec.some((elem, idx) => elem.name.toLowerCase() === item.name.toLowerCase() && idx !== index)
    );

    // console.log("Duplicates in add test:", duplicates)
    if (duplicates.length > 0 || repeatedname.length > 0) {
      setError("Test Name Already Exit.");
      setflagerror(true);
      Swal.fire("Error! Test Name Already Exit.", "", "warning");
    } else if (
      testrec.every((item) => item.name.trim().toLowerCase() === "" && item.cost.trim().toLowerCase() === "")
    ) {
      Swal.fire("Error!", "", "warning");
      setShownewtable(false);
    }


    else if (
      Addtestrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      )) {
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
    }
    else {
      setError("Please fill in all fields before adding a new test.");
      setflagerror(true);
      Swal.fire("Error!", "", "warning");
    }
  };
  const deleteFunction = (index, id, flageArray) => {

    flageArray
      ? Swal.fire({
        title: "Do you want to delete the test?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Yes delete",
        denyButtonText: `Cancel`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          settestrec(prevData => {
            return prevData.filter(test => test._id !== id);
          });
          Swal.fire("Saved!", "", "success");
          setSearch("");
          setCurrentPage(1);
          handleSubmit(); // Assuming handleSubmit function is defined elsewhere
        }
      })
      : setAddtestrec((prevData) => {
        const newData = [...prevData];
        newData.splice(index, 1);
        return newData;
      });

  };
  const handleChangetest = (e, index, id) => {
    setallowaddtest(true);
    setAddtestflag(true);
    const { name, value } = e.target;
    // console.log("ID:", id);
    const recordIndex = testrec.findIndex(item => item._id === id);
    // console.log("Data:", testrec[recordIndex]);
    if (name === "cost" && isNaN(Number(value))) {
      setError("Cost must be a number.");
      return;
    } else {
      setError("");
    }
    if (recordIndex !== -1) {
      const updatedTestRec = [...testrec];
      updatedTestRec[recordIndex] = {
        ...updatedTestRec[recordIndex],
        [name]: value,
      };
      let Currrecordindex = currentRecords.findIndex(item => item._id === id);
      let currentupdatedTestRec = [...currentRecords];

      currentupdatedTestRec[Currrecordindex] = {
        ...currentupdatedTestRec[Currrecordindex],
        [name]: value,
      };
      setCurrentRecords(currentupdatedTestRec);
      settestrec(updatedTestRec);
    }
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Set current page to 1 whenever search changes
  };



  const handleSubmit = () => {
    const duplicates = testrec.filter((item, index) =>
      testrec.some((elem, idx) => elem.name.toLowerCase() === item.name.toLowerCase() && idx !== index)
    );
    const duplicatesinAddtest = Addtestrec?.filter(addTest => {
      return testrec?.some(test => test.name.toLowerCase() === addTest.name.toLowerCase());
    });
    const repeatednameinAddtest = Addtestrec.filter((item, index) =>
      Addtestrec.some((elem, idx) => elem.name.toLowerCase() === item.name.toLowerCase() && idx !== index)
    );
    if (duplicates.length > 0 || duplicatesinAddtest.length > 0 || repeatednameinAddtest.length > 0) {
      setError("Test Name Already Exit.");
      setflagerror(true);
      Swal.fire("Error! Test Name Already Exit.", "", "warning");
    } else if (
      testrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      ) &&
      (Addtestrec.every(
        (item) => item.name.trim() !== "" && item.cost.trim() !== ""
      ))
    ) {

      settestrec(prevTestrec => {
        const updatedTestRec = [...Addtestrec, ...prevTestrec];
        console.log("Updated testrec:", updatedTestRec); // Log the updated value here
        return updatedTestRec; // Return the updated value to update the state
      });
      setShownewtable(false);
      setallowaddtest(false);
      setAddtestflag(false);
      setAddtestrec([])
      setSearch("");
      setCurrentPage(1);
      Swal.fire("Test Records Updated Successfully!", "", "success");

      // console.log("Labusername: ", labeinfo?.username)
      // console.log("testrec", testrec);

    } else {
      setError("Please fill in all fields..");
      setflagerror(true);
      Swal.fire("Error!Please fill in all fields..", "", "warning");

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
            <p className="text-sm text-gray-600 pl-5">{labeinfo?.labName} </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Address:</p>
            <p className="text-sm text-gray-600 pl-5">{labeinfo?.address}</p>
          </div>

        </div>
        <h2 className="text-xl font-semibold mt-10 text-gray-800 mb-4">
          Tests Details
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />

        {/* Table  */}

        {/* Search Br */}


        {!Shownewtable &&  !allowaddtest && (
          <div class="p-6">
            <label for="table-search" class="sr-only">
              Search
            </label>
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
                onChange={handleSearchChange}
                class="px-6 py-2 pl-12 min-w-10  rounded-md flex-1 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                placeholder="Search for items"
              />
            </div>
          </div>
        )}
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
                  ? currentRecords.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
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
                          className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          onChange={(e) => handleChangetest(e, index, item._id)}
                        // disabled={editIndex !== index}
                        />
                      </td>
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          name="cost"
                          placeholder="cost"
                          value={item.cost}
                          className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          onChange={(e) => handleChangetest(e, index, item._id)}
                        // disabled={editIndex !== index} 
                        />
                      </td>
                      <td className="p-3 px-5 flex justify-end">
                        {testrec.length > 1 && (
                          <button
                            onClick={() => deleteFunction(index, item._id, true)}
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
                      className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
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
                          className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
                          className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
          {/* Pagination code */}
          {
            // show the pagination only if filter records is greater than 5
            (!Shownewtable && !allowaddtest) ? (
              <div className="px-5 py-5  bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs text-gray-900">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage * pageSize >= totalPages}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null
          }
        </div>
        <div className="p-5">
          {!addtestflag && <button
            type="button"
            onClick={addFunction}
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Test
          </button>}
          {allowaddtest ? (
            <button
              type="button "
              onClick={handleSubmit}
              class="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Save test Changes
            </button>
          ) : null}
          {Shownewtable && (
            <button
              onClick={() => {
                setAddtestrec([]);
                setShownewtable(false);
                setallowaddtest(false);
                setAddtestflag(false);
              }}
              type="cancel"
              className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default MangeLabTests;
