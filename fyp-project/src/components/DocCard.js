import React from 'react';

const DocCard = () => {
    return (
        <div className="mb-6 rounded-lg bg-white p-6 mt-5 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-white-100 duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        className="mr-2 h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="profile"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Alex Stanton</h3>
                        <span className="block text-xs font-normal text-gray-500">UI / UX Designer</span>
                    </div>
                </div>
                <p className="text-sm font-medium text-indigo-500">
                    <span className="mr-0.5">+</span>Follow
                </p>
            </div>
            <p className="my-6 text-sm font-normal text-gray-500">
                Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . .
            </p>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
                <div className="flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mr-2 h-5 w-5 text-base text-gray-500"
                    >
                        {/* ... */}
                    </svg>
                    <span className="mr-1">40</span> Task
                </div>
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mr-1 h-5 w-6 text-yellow-500"
                    >
                        {/* ... */}
                    </svg>
                    4.7 (750 Reviews)
                </div>
            </div>
        </div>
    );
};

export default DocCard;
