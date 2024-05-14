import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const StarsRating = ({ stars }) => {
    const value = stars.value;
    console.log("StarsRating: ", value);
    console.log("StarsRating: ", stars);
    const StarsRating = Array.from({ length: 5 }, (elem, index) => {

        return (
            <span key={index}>
                {value >= index + 1 ? (
                    <FaStar className={`text-yellow-500`} />
                ) : value >= index + 0.5 ? (
                    <FaStarHalfAlt className={`text-yellow-500`} />
                ) : value > 0 ? (
                    <AiOutlineStar className={`text-yellow-500`} />
                ) : (
                    <AiOutlineStar className={`text-gray-500`} /> // For stars = 0
                )}
            </span>
        );
    });

    return (
        <div className="flex justify-end">
            <div className="flex ">{StarsRating}</div>
            {/* <p className="reviews"> ( {stars.outof} reviews )</p>  */}
            
            { value != 0 ?
                <p className="reviews"> ( {stars.outof} reviews )</p> :
                <p className="reviews"> ( 0 reviews )</p>
            }
        </div>
    );
};
export default StarsRating;