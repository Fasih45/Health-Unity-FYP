import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Hardhat from "./Hardhat";
import Uploadtest from "./Uploadtest";
import { getTrustedPatients, getTrustedPatientsRequest } from "../redux/actions/patientTrustedlistforLabAction";

export default function UploadTestrecord() {

  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();
  const { user, username } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(
    (state) => state.patientTrustedListforLab.trustedPatients
  );
  const statusCode = useSelector(
    (state) => state.patientTrustedListforLab.statusCode
  );

  useEffect(() => {
    dispatch(getTrustedPatients(username));
  }, [dispatch, username]);
  useEffect(() => {
    console.log("data:", list);
  }, [list]);
  useEffect(() => {
    if (statusCode === 401) {
      dispatch(getTrustedPatientsRequest());
      navigate(`/`);
    }
  }, [statusCode, dispatch, navigate]);




  // Search Bar
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 5;
  const indexOfLastRecord = currentPage * recordsPerpage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerpage;
  const filteredRecords = list?.patientList?.filter((item) => {
    return search === ""
      ? true
      : item.patientUsername.toLowerCase().includes(search.toLowerCase()) ;
  });
  console.log("filteredRecords:", filteredRecords);
  const currentRecords = filteredRecords?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
);

  console.log("currentRecords:", currentRecords);
  const totalRecords = filteredRecords ? filteredRecords.length : 0;
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [search, list?.patientList]);

  return (
    <>
      <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        {/* Serach Bar  */}
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            onChange={(e) => setSearch(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Patients" />
        </div>
      </div>
      <div className="-mx-4  px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              {/* Table header */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Username
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                currentRecords?.map((item, index) => (
                  <tr key={index} className={`border-b hover:bg-blue-50 `}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstRecord + index + 1}
                    </td>
                    <td class="text-lg text-gray-900 font-semi-bold px-6 py-4 whitespace-nowrap">{item.patientName}</td>
                    <td class="text-lg text-gray-900 font-semi-bold px-6 py-4 whitespace-nowrap">{item.patientUsername}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        onClick={() => {
                          setPatientId(item.patientUsername);
                        }}
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Upload Test
                      </button>

                    </td>
                  </tr>
                ))

              }

            </tbody>
          </table>
          {/* Pagination code */}
          {
            // show the pagination only if filter records is greater than 5
            filteredRecords?.filteredRecords?.length >= 5 ? (
              <div className="px-5 py-5  bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs text-gray-900">
                  Page {currentPage} of{" "}
                  {Math.ceil(totalRecords / recordsPerpage)}
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
                    disabled={indexOfLastRecord >= totalRecords}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

      {patientId && <Uploadtest patientId={patientId} setPatientId={() => setPatientId(null)} />}
    </>
  );
}
