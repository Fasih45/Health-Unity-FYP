import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const StarsRating = ({ stars}) => {
    const StarsRating = Array.from({ length: 5 }, (elem, index) => {
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <FaStar className={`text-yellow-500`} />
                ) : stars >= index + 0.5 ? (
                    <FaStarHalfAlt className={`text-yellow-500`} />
                ) : (
                    <AiOutlineStar className={`text-yellow-500`} />
                )}
            </span>
        );
    });

    return (
        <div className="flex justify-end">
            <div className="flex ">{StarsRating}</div>
            <p className="reviews">({stars} )</p>
        </div>
    );
};
export default StarsRating;