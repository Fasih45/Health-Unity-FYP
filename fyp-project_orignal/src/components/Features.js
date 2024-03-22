import React from 'react';

const Features = () => {
    return (
        <div>
            
            <section className="bg-white pb-6">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto px-6 p-6 bg-white">

                        <div className="mb-16 text-center">
                            <h4 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h4>
                            <p className="mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900">How we change the game</p>
                        </div>

                        <div className="flex flex-wrap my-12">

                            {/* Feature 1 */}
                            <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Unified Health Records</div>
                                </div>
                                <p className="leading-loose text-gray-500">Comprehensive patient dashboards providing a holistic view of health journeys, including medical history, prescriptions, and treatment plans.</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Transparent Collaboration</div>
                                </div>
                                <p className="leading-loose text-gray-500">Secure communication channels fostering transparent relationships between patients and healthcare providers, enabling seamless interaction and informed decision-making.</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Efficient Prescription Management</div>
                                </div>
                                <p className="leading-loose text-gray-500">Streamlined processes for prescription management, ensuring availability of medications and optimizing fulfillment.</p>
                            </div>

                            {/* Feature 4 */}
                            <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Holistic Care Decision Support</div>
                                </div>
                                <p className="leading-loose text-gray-500">Unified repository empowering healthcare professionals with data-driven insights for enhanced patient care decisions and personalized treatment plans.</p>
                            </div>

                            {/* Feature 5 */}
                            <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Blockchain Security and Privacy</div>
                                </div>
                                <p className="leading-loose text-gray-500">Integration of blockchain technology ensuring robust data security, encryption, and patient data control, thereby enhancing privacy and confidentiality.</p>
                            </div>

                            {/* Feature 6 */}
                            <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500">
                                        <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path>
                                    </svg>
                                    <div className="ml-4 text-xl">Instant Medication Insights</div>
                                </div>
                                <p className="leading-loose text-gray-500">Rapid access to real-time medication availability information at nearby pharmacies, facilitating quicker prescription fulfillment and improving patient convenience.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between">
                {/* Feature 1 */}
                <div className="grid gap-4 justify-items-center text-center md:flex-1">
                    <div className="rounded-full border-8 border-amber-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold">Safe</h3>
                    {/* <p>Our products are secure and private out-of-the-box</p> */}
                </div>

                {/* Feature 2 */}
                <div className="grid gap-4 justify-items-center text-center md:flex-1">
                    <div className="rounded-full border-8 border-amber-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold">Efficient</h3>
                    {/* <p>Feel good about your wallet and the environment</p> */}
                </div>

                {/* Feature 3 */}
                <div className="grid gap-4 justify-items-center text-center md:flex-1">
                    <div className="rounded-full border-8 border-amber-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold">Proven</h3>
                    {/* <p>Leading the Smart Home world for 10 years</p> */}
                </div>
            </div>


        </div>

    );
};

export default Features;
