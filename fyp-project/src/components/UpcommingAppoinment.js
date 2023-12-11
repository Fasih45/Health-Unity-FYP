import React from "react";

const UpcommingAppoinment = () => {
    const user = {
        bio: 'Healthcare professionals such as doctors will use the platform to access patient records, make informed medical decisions, and collaborate with patients.',
        des: 'Pharmacies will integrate with the platform to provide real-time information on medication availability, receive prescriptions electronically, and fulfill patient medication needs. Medical laboratories and technicians will use the platform to input and share test results securely with authorized healthcare providers and patients.',
        speciality: 'Heart specialist',
        name: 'John Doe',
        hospitalname: "Allied Hospital",
        workingdays: "Tuesday",
        fee: "Not Defined"
    }

    return (
        <div>

            <section class="container px-4 mx-auto">
                <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="felx justify-left ml-4 font-bold">Upcomming Appointment Status</div>
                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Doctor
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Appoinment Fee
                                            </th>

                                            <th scope="col" class="relative py-3.5 px-4">
                                                <span class="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        
                                        <tr>

                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>
                                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">


                                                    <h2 class="text-sm font-normal">Upcomming</h2>
                                                </div>
                                            </td>
                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div class="flex items-center gap-x-2">
                                                    <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h2 class="text-sm font-medium text-gray-800 dark:text-white ">{user.name}</h2>
                                                        <p class="text-xs font-normal text-gray-600 dark:text-gray-400">{user.speciality}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.fee}</td>
                                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                <div class="flex items-center gap-x-6">
                                                    <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                        View Doctor Profile
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </section>


        </div>



    );



};

export default UpcommingAppoinment;