// UpcomingAppointment.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAppointments,
  getAppointmentsRequest,
} from "../redux/actions/appointmentAction";
import TableBody from "./TableBody"; // Import the new component
import {
  getDoctorProfilesRequest,
  getProfileDoc,
} from "../redux/actions/searcProfileAction";


const ConfirmAppointment = () => {
  const appointments = useSelector((state) => state.appointment.appointments);
  const statusCode = useSelector((state) => state.appointment.statusCode);
  const { singleprofile, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, username } = useParams();
  const [viewprofile, setviewprofile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      setviewprofile(null);
      dispatch(getDoctorProfilesRequest());
      dispatch(getAppointmentsRequest());
      console.log("Component unmounted");
    };
  }, [location, dispatch]);
  useEffect(() => {
    dispatch(getAppointments(user, username));
  }, [dispatch, user, username,location]);
  useEffect(() => {
 console.log(statusCode)
  }, [statusCode]);

  useEffect(() => {
    if (viewprofile) {
      dispatch(getProfileDoc(viewprofile));
    }
  }, [viewprofile, dispatch]);

  useEffect(() => {
 
    if((statusCode ===404||statusCode ===401)){
      dispatch(getAppointmentsRequest());
      navigate(`/`)
    }
  }, [navigate,statusCode,dispatch]);
  
  return (
    <>
      {/* {((appointments)&&(!viewprofile))&& ( */}
      {(
        <div>
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="flex justify-left ml-4 font-bold">
                    Appointment Status
                  </div>
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Time
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Status
                          </th>
                          {user==="patient"?(<th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Doctor
                          </th>):<th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                           Patient 
                          </th>}
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Appointment Fee
                          </th>
                          {<th scope="col" className="relative py-3.5 px-4">
                            <span className="sr-only">Actions</span>
                          </th>}
                        </tr>
                      </thead>
                      {/* Use the TableBody component and pass appointments as props */}

                      {/* {appointments.appointments&&(
                        <TableBody
                          appointments={appointments.appointments}
                          viewprofile={(profile) => {
                            setviewprofile(profile);
                          }}
                        />)
                      } */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) }

     
    </>
  );
};

export default ConfirmAppointment;
