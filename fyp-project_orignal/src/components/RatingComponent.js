import React, { useState } from "react";
import { Rate } from "antd";

const RatingComponent = ({ showRating, setshowRating }) => {
  const [hoverValue, setHoverValue] = useState(null);
  const [ratingValue, setRatingValue] = useState(null);

  const handleRateChange = (value) => {
    setRatingValue(value);
  };

  const handleCancel = () => {
    setshowRating(false);
  };

  return (
    <>
      {showRating && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-5 w-20em pt-2 rounded">
            <Rate/>
            
            
          </div>
        </div>
      )}
    </>
  );
};

export default RatingComponent;
