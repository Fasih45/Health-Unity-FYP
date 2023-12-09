import React, { useState } from 'react';

const BookAppoinment = () => {

    const docuser = {
        name: 'John Doe',
        specilati: 'heart',
        hospital: 'Allied hospital',
        day: '',
        fee: '500',

    }



    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission

    };

    return (
        <div className="w-full bg-gray-300 flex items-center justify-center p-12">

            {/* Author: FormBold Team */}
            <div className="mx-auto w-full max-w-[550px] rounded-xl p-6 bg-white">
                <div class="flex justify-center p-5 font-bold">
                    Book Appointment
                </div>
                <form onSubmit={handleSubmit}>
                    {/* ... (rest of the form structure) */}

                    {/* Full Name */}
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                            Doctor Name :
                        </label>
                        <input type="text" name="phone" id="phone" placeholder={docuser.name} disabled
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="mb-5">
                        <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                            Doctor speciality:
                        </label>
                        <input type="text" name="phone" id="phone" placeholder={docuser.specilati} disabled
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                            Hospital Address
                        </label>
                        <input type="email" name="email" id="email" placeholder={docuser.hospital} disabled
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                            Patient Name:
                        </label>
                        <input type="email" name="email" id="email" placeholder="Ali" disabled
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                            Checkup Fee:
                        </label>
                        <input type="email" name="email" id="email"  placeholder={`Rs. ${docuser.fee}`} disabled
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="day" className="mb-3 block text-base font-medium text-[#07074D]">
                            Select a Day
                        </label>
                        <select
                            id="day"
                            name="day"
                            // value={selectedDay}
                            // onChange={handleDayChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                            <option value="hjhjh" disabled>
                                Choose a day
                            </option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>


                    {/* Book Appointment Button */}
                    <div className='flex justify-center '>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Book Appointment
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BookAppoinment;
