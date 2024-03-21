import React from "react";

const Medworkplaceinfo = (props) => {
    const datamed = props.data;
    // console.log("data address:", datamed.address)

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Workplace Info
            </h2>

            {/* Divider Line */}
            <hr className="my-4 border-t border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 space-y-5">
                <div>
                    <p className="text-sm text-gray-600">Address:</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {datamed.address}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Clinic Name:</p>
                    <p className="text-lg font-semibold text-gray-800">
                        <ul>
                            <li class="mb-2">
                                {datamed.workingdays
                                    .map((item) => item.trim())
                                    .join(", ")}
                            </li>
                        </ul>

                    </p>
                </div>
            </div>
        </div>


    )
}

export default Medworkplaceinfo;