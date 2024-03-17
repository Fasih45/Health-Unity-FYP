import React, { useEffect, useState } from "react";
import AddLabstotrust from "./AddLabstotrust";

export default function LabViewProfile(props) {
  const docuser = props.profile;
  const [addlabtrust, setaddlabtrust] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 5;
  const indexOfLastRecord = currentPage * recordsPerpage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerpage;
  const filteredRecords = docuser.test.filter((item) => {
    return search === ""
      ? true
      : item.name.toLowerCase().includes(search.toLowerCase());
  });
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalRecords = filteredRecords.length;
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [search, docuser.test]);

  // Change page

  return (
    <>
      <div class="bg-gray-100">
        <div class="container min-h-screen  mx-auto py-8">
          <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 h-full">
            <div class="col-span-4 sm:col-span-3">
              <div class="bg-white shadow rounded-lg p-6 h-full">
                <div class="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                    {docuser.labName.charAt(0)}
                  </div>
                  <h1 class="text-xl font-bold">{docuser.labName}</h1>
                  <div class="flex flex-row items-center">
                    <svg
                      class="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      4.95
                    </p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      out of
                    </p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5
                    </p>
                  </div>
                </div>
                <hr class="my-6 border-t border-gray-300" />
                <div class="flex flex-col">
                  <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Address
                  </span>
                  <ul>
                    <li class="mb-2">{docuser.address}</li>
                  </ul>
                  <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Working Days
                  </span>
                  <ul>
                    <li class="mb-2">
                      {docuser.workingdays
                        .map((item) => item.trim())
                        .join(", ")}
                    </li>
                  </ul>
                  <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    setaddlabtrust(docuser.username)
                  }}
                >
                  Add to Trusted List
                </button>

                </div>
              </div>
            </div>
            <div class="col-span-4 bg-white p-4  min-h-screen rounded-lg sm:col-span-9">
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
                    onChange={(e) => setSearch(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />
                </div>
              </div>
              <table className="min-w-full  divide-y rounded-lg dark:border-neutral-500 border-b divide-gray-200 overflow-x-auto">
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
                  </tr>
                </thead>
                <tbody className="bg-white  divide-y divide-gray-200">
                  {currentRecords.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-blue-200 bg-white`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {indexOfFirstRecord + index + 1}
                      </td>
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          value={item.name}
                          className={`bg-transparent  rounded-full border-b-2 px-4  py-2 bg-white`}
                          disabled={true} // Disable input if not in edit mode
                        />
                      </td>
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          name="cost"
                          placeholder="cost"
                          value={item.cost}
                          className={`bg-transparent rounded-full border-b-2 px-4 py-2 bg-white`}
                          disabled={true} // Disable input if not in edit mode
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination code */}
              {
                // show the pagination only if filter records is greater than 5
                filteredRecords.length >= 5 ? (
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
        </div>
      </div>
      <button
        onClick={() => {
          props.goBack();
        }}
        className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
      >
        Go Back
      </button>
      {addlabtrust && (
        <AddLabstotrust
          data={addlabtrust}
          setaddlabtrust={(value) => setaddlabtrust(value)}
        />
      )}
    </>
  );
}
