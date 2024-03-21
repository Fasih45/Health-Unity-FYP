import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAppointments,
  getAppointmentsRequest,
} from "../redux/actions/appointmentAction";
import TableBody from "./TableBody";
import {
  getDoctorProfilesRequest,
  getProfileDoc,
} from "../redux/actions/searcProfileAction";
import DocViewProfile from "./DocViewProfile";
import Notfound404 from "./Notfound404";
import WritePriscription from "./WritePriscription";

const UpcomingAppointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const appointments = useSelector((state) => state.appointment.appointments);
  const statusCode = useSelector((state) => state.appointment.statusCode);
  const test = useSelector((state) => state.patientTrustedList.statusCode);
  const { singleprofile, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, username } = useParams();
  const [viewprofile, setviewprofile] = useState(null);
  const [writePriscription, setWritePriscription] = useState(false);
  const [priscriptionData, setPriscriptionData] = useState(null);
  const [viewPrescriptiondata, setviewpatientPrescriptiondata] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setviewprofile(null);
      dispatch(getDoctorProfilesRequest());
      dispatch(getAppointmentsRequest());
      console.log("Component unmounted");
      setCurrentPage(1);
      setSearchQuery("");
      setStatusFilter("");
    };
  }, [location, dispatch]);
  useEffect(() => {
    dispatch(getAppointments(user, username, 1, "", ""));
  }, [dispatch, user, username, location]);
  useEffect(() => {
    if (statusCode === 201) {
      console.log(statusCode);
      dispatch(getAppointments(user, username, 1, "", ""));
    }
  }, [statusCode, dispatch, user, username]);

  useEffect(() => {
    dispatch(
      getAppointments(user, username, currentPage, statusFilter, searchQuery)
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getAppointments(user, username, 1, statusFilter, searchQuery));
    setCurrentPage(1);
  }, [dispatch, statusFilter]);
  useEffect(() => {
    if (viewprofile) {
      dispatch(getProfileDoc(viewprofile));
    }
  }, [viewprofile, dispatch]);

  useEffect(() => {
    if (statusCode === 404 || statusCode === 401) {
      dispatch(getAppointmentsRequest());
      navigate(`/`);
    }
  }, [navigate, statusCode, dispatch]);

  useEffect(() => { }, [navigate, statusCode, dispatch]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleclick = (e) => {
    dispatch(getAppointments(user, username, 1, statusFilter, searchQuery));
    setCurrentPage(1);
  };
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      {appointments && !viewprofile && !writePriscription && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Appointments
              </h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
              <button
                className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
                onClick={handleclick}
              >
                Search
              </button>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Date
                      </th>
                      <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Status
                      </th>

                      {user === "patient" ? (
                        <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Doctor
                        </th>
                      ) : (
                        <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Patient
                        </th>
                      )}

                      {user === "patient" ? (
                        <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Appointment Fee
                        </th>
                      ) : (
                        <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          MedicalRecord Record
                        </th>
                      )}

                      <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Timing
                      </th>
                      <th className="px-5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {appointments.appointments && (
                    <TableBody
                      appointments={appointments.appointments}
                      writePriscription={writePriscription}
                      viewprofile={(profile) => {
                        setviewprofile(profile);
                      }}
                      setWritePriscription={() => {
                        setWritePriscription(true);
                      }}
                      setPriscriptionData={(profile) => {
                        setPriscriptionData(profile);
                      }}
                      setviewpatientPrescriptiondata={(value) => {
                        setviewpatientPrescriptiondata(value);
                      }}
                    />
                  )}
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs text-gray-900">
                    Page {currentPage}{" "}
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={appointments?.appointments?.length === 0}
                      className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewprofile && singleprofile && (
        <DocViewProfile docProfile={singleprofile}
          goBack={() => setviewprofile(null)}
        />
      )}
      {writePriscription && (
        <WritePriscription
          priscriptionData={priscriptionData}
          setWritePriscription={(data) => {
            setWritePriscription(data);
          }}
          forview={viewPrescriptiondata}
        />
      )}

    </>
  );
};

export default UpcomingAppointment;
