import React, { useEffect, useState } from "react";
import DocCard from "./DocCard";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../redux/actions/searcProfileAction";

const ToolSearchForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const dispatch = useDispatch();
  const { profiles, currentPage, totalItems, loading, error } = useSelector(
    (state) => state.searchProfile
  );

  useEffect(() => {
    // Dispatch the API call with initial parameters
    dispatch(getProfiles({ page: 1, fullName: searchInput, specialty: pricingType }));
  }, [dispatch, searchInput, pricingType]);

  useEffect(() => {
    console.log("Profiles:", profiles);
    console.log("Current Page:", currentPage);
    console.log("Total Items:", totalItems);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [profiles, currentPage, totalItems, loading, error]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setNum(newPage);
      setCur(newPage);
      dispatch(getProfiles({ page: newPage, fullName: searchInput, specialty: pricingType }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getProfiles({ page: 1, fullName: searchInput, specialty: pricingType }));
  };

  return (
    <div>
      {/* Search Bar */}
      <form
        className="flex justify-center flex-col md:flex-row gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search for the tool you like"
            className="md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </div>
        <select
          id="pricingType"
          name="pricingType"
          className="w-21 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 "
          value={pricingType}
          onChange={(e) => setPricingType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Freemium">Freemium</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </form>

      {/* User info card */}
      <div className="min-h-screen bg-gray-50 pb-10">
        <div className="mx-auto">
          <main className="bg-blue-500">
            <div className="px-4 mt-10 bg-blue-500">
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                {profiles.map((profile) => (
                  <DocCard key={profile.id} profile={profile} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Pagination code */}
      <div className="flex justify-center py-4 bg-white rounded-lg font-[Poppins]">
        <button
          onClick={() => handlePageChange(num - 1)}
          className={`h-12 border-2 border-r-0 border-indigo-600 px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white ${num === 1 && "opacity-50 cursor-not-allowed"}`}
          disabled={num === 1}
        >
          Previous
        </button>
        {[num, num + 1, num + 2, num + 3].map((pg, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(pg)}
            className={`h-12 border-2 border-r-0 border-indigo-600 w-12 ${cur === pg && "bg-indigo-600 text-white"}`}
          >
            {pg}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(num + 1)}
          className={`h-12 border-2  border-indigo-600 px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ToolSearchForm;
