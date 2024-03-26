// TableBody.js
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import PopupModel from "./PopupModel";
import WritePriscription from "./WritePriscription";
const TableBody = ({
  appointments,
  viewprofile,
  setWritePriscription,
  writePriscription,
  setPriscriptionData,
  setviewpatientPrescriptiondata,
}) => {
  const { user, username } = useParams();
  const [showmymodel, setshowmymodel] = useState(false);
  const [data, setData] = useState(null);
  const handleonclose = () => setshowmymodel(false);
  useEffect(() => {
    console.log(appointments);
  }, []);
  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {appointment.date.split("T")[0]}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                class={`relative inline-block px-3 py-1 font-semibold
              ${
                appointment.status === "Settled"
                  ? "text-blue-900"
                  : appointment.status === "Approved"
                  ? "text-green-900"
                  : appointment.status === "Pending"
                  ? "text-orange-900"
                  : appointment.status === "Rejected"
                  ? "text-red-900"
                  : ""
              }  leading-tight`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 ${
                    appointment.status === "Settled"
                    ? "bg-blue-300":
                    appointment.status === "Approved"
                      ? "bg-green-300"
                      : appointment.status === "Pending"
                      ? "bg-orange-300"
                      : appointment.status === "Rejected"
                      ? "bg-red-300"
                      : ""
                  } opacity-50 rounded-full`}
                ></span>

                <span class="relative">{appointment.status}</span>
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              <div className="flex items-center gap-x-2">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                  {user === "patient"
                    ? appointment.doctorName.charAt(0)
                    : appointment.patientName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                    {user === "patient"
                      ? appointment.doctorName
                      : appointment.patientName}
                  </h2>
                </div>
              </div>
            </td>
            {user === "patient" ? (
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {appointment.fee}
              </td>
            ) : (
              <td className="px-8 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                    onClick={() => {
                      setWritePriscription();
                      setPriscriptionData(appointment);
                      setviewpatientPrescriptiondata(true);
                    }}
                  >
                    View MedicalRecord
                  </button>
                </div>
              </td>
            )}

            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {appointment.status === "Approved"||appointment.status === "Settled"
                ? appointment.timing
                : "Not Assigned"}
            </td>
            {/* IF user is patient */}
            {user === "patient" && (
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                    onClick={() => {
                      viewprofile(appointment.doctorUsername); // Calls setbook(1)
                    }}
                  >
                    View Doctor Profile
                  </button>
                </div>
              </td>
            )}

            {/* IF user is doctor */}
            {user === "doctor" && (
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  {appointment.status === "Approved" ? (
                    <button
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-300 text-green-900   transition-colors duration-200 dark:hover:text-indigo-500 dark:text-white hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setWritePriscription();
                        setPriscriptionData(appointment);
                      }}
                    >
                      Write Priscription ......
                    </button>
                  ) : appointment.status === "Pending" ? (
                    <button
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-[#1da1f2] text-white   transition-colors duration-200 dark:hover:text-indigo-500 dark:text-white hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setshowmymodel(true);
                        setData(appointment);
                      }}
                    >
                      Confirm appointment
                    </button>
                  ) : appointment.status === "Rejected" ? (
                    "rejected"
                  ) : (
                    ""
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
      <PopupModel onclose={handleonclose} visible={showmymodel} data={data} />
    </>
  );
};

export default TableBody;
