import React from 'react';

const Aboutus = () => {
    return (
        <diV>
            <div className="sm:flex items-center max-w-screen-xl">
                <div className="sm:w-1/2 p-10">
                    <div className="image object-center text-center">
                        <img src="https://i.imgur.com/WbQnbas.png" alt="About Us" />
                    </div>
                </div>
                <div className="sm:w-1/2 p-5">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">
                            About <span className="text-indigo-600">Our Company</span>
                        </h2>
                        <p className="text-gray-700">
                            Health Unity offers numerous strategic business opportunities within the healthcare sector. It enhances patient care and outcomes,
                            streamlines prescription fulfillment, and ensures robust data security through blockchain technology.
                            Additional prospects include interoperability services, consulting, data analytics, market expansion,
                            patient engagement solutions, compliance auditing, and telehealth integration.
                        </p>
                    </div>
                </div>
            </div>

            <section className="overflow-hidden bg-white py-8 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Health Unity</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Main Objective</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">The current healthcare system faces challenges with scattered patient information, poor communication among healthcare groups, and patients feeling powerless. Due to this, doctors might lack key details, and patients could experience delays in getting prescriptions. To address these issues, we propose Health Unity, a Collaborative Healthcare Platform.</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600">
                                                <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd" />
                                            </svg>
                                            Patient Empowerment
                                        </dt>
                                        <dd className="inline">: Patients will use the platform to access and manage their personal medical data, view medical records, prescriptions, and collaborate with healthcare providers.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600">
                                                <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd" />
                                            </svg>
                                            Doctors and Healthcare Providers:
                                        </dt>
                                        <dd className="inline"> Healthcare professionals such as doctors will use the platform to access patient records, make informed medical decisions, and collaborate with patients..</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600">
                                                <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd" />
                                            </svg>
                                            Medical Labs:
                                        </dt>
                                        <dd className="inline">Medical laboratories and technicians will use the platform to input and share test results securely with authorized healthcare providers and patients.</dd>
                                    </div>
                                </dl>
                            </div>
                            {/* <div className="mt-10 flex items-center gap-x-6">
                                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start for free</a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-700">Schedule a demo <span aria-hidden="true">→</span></a>
                            </div> */}
                        </div>
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
                    </div>
                </div>
            </section>

        </diV>


    );
};

export default Aboutus;
