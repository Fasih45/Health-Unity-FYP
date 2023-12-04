import React from 'react';

const ToolSearchForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        // You can access form data using event.target.elements
    };

    return (
        <div className='w-full p-4'>
            <form className="flex justify-center flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search for the tool you like"
                        className="md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
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
                >
                    <option value="All" selected="">
                        All
                    </option>
                    <option value="Freemium">Freemium</option>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                </select>
            </form>


            <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center lg:h-screen">
                <div className="container mx-auto p-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {/* Replace this with your grid items */}
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className="bg-white rounded-lg border p-4">
                                <img
                                    src="https://placehold.co/300x200/d1d4ff/352cb5.png"
                                    alt="Placeholder Image"
                                    className="w-full h-48 rounded-md object-cover"
                                />
                                <div className="px-1 py-4">
                                    <div className="font-bold text-xl mb-2">Blog Title</div>
                                    <p className="text-gray-700 text-base">
                                        This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
                                    </p>
                                </div>
                                <div className="px-1 py-4">
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        ))}
                        {/* Add more items as needed */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ToolSearchForm;
