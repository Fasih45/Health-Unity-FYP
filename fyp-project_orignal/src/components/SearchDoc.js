import React, { useEffect, useState } from "react";
import DocCard from "./DocCard";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfilesRequest, getProfiles } from "../redux/actions/searcProfileAction";
import BookAppoinment from "./BookAppoinment";
import { useLocation, useParams } from "react-router-dom";
import DocViewProfile from "./DocViewProfile";
import Notfound404 from "./Notfound404";
import LabViewProfile from "./LabViewProfile";

const ToolSearchForm = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const [book, setBook] = useState(null);
  const [viewProfile, setViewProfile] = useState(null);
  const [viewProfileLab, setViewProfileLab] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useParams();

  useEffect(() => {
    // Cleanup function
    return () => {
      // Reset all state variables to their default values
      setSearchInput("");
      setPricingType("");
      setNum(1);
      setCur(1);
      setBook(null);
      setViewProfile(null);
      setViewProfileLab(null);  
          
    };
  }, [location]);

  const { profiles, currentPage, totalItems, loading, error } = useSelector(
    (state) => state.searchProfile
  );
  useEffect(() => {
    // Dispatch the API call with initial parameters
    !props.Medicallab
      ? dispatch(
          getProfiles(
            user,
            { page: 1, fullName: searchInput, specialty: pricingType },
            "doctor"
          )
        )
      : pricingType === "ok"
      ? dispatch(
          getProfiles(
            user,
            { page: 1, fullName: "", specialty: searchInput },
            "medicalLab"
          )
        )
      : dispatch(
          getProfiles(
            user,
            { page: 1, fullName: searchInput, specialty: "" },
            "medicalLab"
          )
        );
  }, [dispatch, pricingType, user,props.Medicallab,searchInput]);

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
      !props.Medicallab
        ? dispatch(
            getProfiles(
              user,
              { page: newPage, fullName: searchInput, specialty: pricingType },
              "doctor"
            )
          )
        : pricingType === "ok"
        ? dispatch(
            getProfiles(
              user,
              { page: newPage, fullName: "", specialty: searchInput },
              "medicalLab"
            )
          )
        : dispatch(
            getProfiles(
              user,
              { page: newPage, fullName: searchInput, specialty: "" },
              "medicalLab"
            )
          );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    !props.Medicallab
      ? dispatch(
          getProfiles(
            user,
            { page: 1, fullName: searchInput, specialty: pricingType },
            "doctor"
          )
        )
      : pricingType === "ok"
      ? dispatch(
          getProfiles(
            user,
            { page: 1, fullName: "", specialty: searchInput },
            "medicalLab"
          )
        )
      : dispatch(
          getProfiles(
            user,
            { page: 1, fullName: searchInput, specialty: "" },
            "medicalLab"
          )
        );
  };

  return (
    <>
      {user !== "patient" ? (
        <Notfound404 />
      ) : !book && !viewProfile && !viewProfileLab  ? (
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
            {!props.Medicallab && (
              <select
                id="pricingType"
                name="pricingType"
                className="w-21 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 "
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
              >
                <option value="">All</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Neurology">Neurology</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Psychiatry">Psychiatry</option>
              </select>
            )}
            {props.Medicallab && (
              <select
                id="pricingType"
                name="pricingType"
                className="w-21 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 "
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
              >
                <option value="">By Lab</option>
                <option value="ok">By Test</option>
              </select>
            )}
          </form>

          {/* User info card */}
          <div className="min-h-screen bg-gray-50 pb-10">
            <div className="mx-auto">
              <main className="bg-blue-500">
                <div className="px-4 mt-10 bg-blue-500">
                  <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                    {profiles&&
                      profiles.map((profile) => (
                        <DocCard
                          key={profile.id}
                          profile={profile}
                          book={() => setBook(profile)}
                          viewprofile={() => setViewProfile(profile)}
                          setViewProfileLab={() => setViewProfileLab(profile)}
                          Medicallab={props.Medicallab}
                        />
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
              className={`h-12 border-2 border-r-0 border-indigo-600 px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white ${
                num === 1 && "opacity-50 cursor-not-allowed"
              }`}
              disabled={num === 1}
            >
              Previous
            </button>
            {[num, num + 1, num + 2, num + 3].map((pg, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(pg)}
                className={`h-12 border-2 border-r-0 border-indigo-600 w-12 ${
                  cur === pg && "bg-indigo-600 text-white"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(num + 1)}
              className={`h-12 border-2  border-indigo-600 px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>
      ) : book ? (
        <BookAppoinment docProfile={book} />
      ) : viewProfileLab?(<LabViewProfile profile={viewProfileLab}/>):(
        <DocViewProfile
          docProfile={viewProfile}
          book={() => setBook(viewProfile)}
          viewprofile={() => setViewProfile(viewProfile)}
        />
      )}
    </>
  );
};

export default ToolSearchForm;
