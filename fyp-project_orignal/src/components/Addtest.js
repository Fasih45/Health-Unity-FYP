import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Addtest = ({ test, onTestChange }) => {
    const [testrec, settestrec] = useState([{ name: "", cost: "" }]);
    const [editIndex, setEditIndex] = useState(null); // State to track the index being edited
    const [error, setError] = useState("");
    const [flagerror, setflagerror] = useState(false);
    useEffect(() => {
        // Only call onTestChange if testrec changes
        if (testrec !== test) {
            onTestChange(testrec);
        }
    }, [testrec, test, onTestChange]);


    const addFunction = () => {
        // console.log('testrec', testrec);
        const duplicates = testrec.filter((item, index) => testrec.some((elem, idx) => elem.name === item.name && idx !== index));
        // console.log('duplicates', duplicates);
        if (duplicates.length > 0) {
            setError("Test Name Already Exit.");
            setflagerror(true);

        } else if (testrec.every(item => item.name.trim() !== "" && item.cost.trim() !== "")) {
            const newTestIndex = testrec.length;
            settestrec((prevData) => [
                ...prevData,
                {
                    name: "",
                    cost: "",
                },
            ]);
            setEditIndex(newTestIndex);
            setError("");
            setflagerror(false);
        } else {
            setError("Please fill in all fields before adding a new test.");
            Swal.fire("Error!Please Fill all Fields", "", "warning");
            setflagerror(true);
        }
    }

    const deleteFunction = (index) => {
        settestrec((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    }

    const handleChangetest = (e, index) => {
        const { name, value } = e.target;
        const updatedFormData = [...testrec];

        // Ensure that "cost" is a number
        if (name === "cost" && isNaN(Number(value))) {
            setError("Cost must be a number.");
            return;
        } else {
            setError("");
        }

        updatedFormData[index] = {
            ...updatedFormData[index],
            [name]: value,
        };
        settestrec(updatedFormData);
        setError("")
    }


    const handleEdit = (index) => {
        setEditIndex(index);
    }

    const handleSubmit = () => {
        const duplicates = testrec.filter((item, index) => testrec.some((elem, idx) => elem.name === item.name && idx !== index));
        if (duplicates.length > 0) {
            setError("Test Name Already Exit.");
            setflagerror(true);

        } else if (testrec.every(item => item.name.trim() !== "" && item.cost.trim() !== "")) {
            Swal.fire("Test Added Successfully", "", "success");
            console.log('testrec', testrec);
        } else {
            setError("Please fill in all fields..");
            setflagerror(true);
        }
    }

    return (
        <>

            <div className="mt-8 mb-3 text-center">
                {flagerror && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
         
            <table className="min-w-full divide-y border-b divide-gray-200 overflow-x-auto">
                <thead class="bg-gray-50">
                    {/* Table header */}
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Test Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {testrec.map((item, index) => (
                        // <tr key={index} className="border-b hover:bg-orange-100 bg-white-100">
                        <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                            <td className="p-3 px-5">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={item.name}
                                    className={`bg-transparent  rounded-full border-b-2 px-4  py-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    onChange={(e) => handleChangetest(e, index)}
                                    // disabled={editIndex === index ? false : true} // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-3 px-5">
                                <input
                                    type="text"
                                    name="cost"
                                    placeholder="cost"
                                    value={item.cost}
                                    className={`bg-transparent rounded-full border-b-2 px-4 py-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    onChange={(e) => handleChangetest(e, index)}
                                    // disabled={editIndex === index ? false : true} // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-3 px-5 flex justify-end">
                                {/* <button
                                    onClick={() => handleEdit(index)} // Set edit mode for this index
                                    type="button"
                                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Edit
                                </button> */}
                                {testrec.length > 1 ? (
                                    <button
                                        onClick={() => deleteFunction(index)}
                                        type="button"
                                        className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                type="button"
                onClick={addFunction}
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Add Test
            </button>
            <button
                type="button"
                onClick={handleSubmit}
                class="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Save test Changes
            </button>
        </>
    );
}

export default Addtest;
