// TableBody.js
import React from "react";
import { useParams } from "react-router-dom";

const TableBody = ({ appointments, viewprofile }) => {
  const { user, username } = useParams();
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {appointments.map((appointment) => (
        <tr key={appointment.id}>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {appointment.date.split('T')[0]}
          </td>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
              <h2 className="text-sm font-normal">{appointment.status}</h2>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <div className="flex items-center gap-x-2">
              <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                {user==='patient'?appointment.doctorName.charAt(0):appointment.patientName.charAt(0)}
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                {user==='patient'?appointment.doctorName:appointment.patientName}
                </h2>
              </div>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            1000
          </td>
          {user==="patient"&&<td className="px-4 py-4 text-sm whitespace-nowrap">
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
          </td>}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
