import React, { useEffect, useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

export const Star: React.FC<{ filled: boolean; onClick?: () => void }> = ({
  filled,
  onClick,
}) => {
  return (
    <div>
      {filled ? (
        <HiStar className="text-2xl text-yellow-400" onClick={onClick} />
      ) : (
        <HiOutlineStar className="text-2xl text-yellow-400" onClick={onClick} />
      )}
    </div>
  );
};

const StarsRating: React.FC<{ onChange: (rating: number) => void }> = ({
  onChange,
}) => {
  const [rating, setRating] = useState(5);
  useEffect(() => {
    onChange(rating);
  }, [onChange, rating]);
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="stars" className="mb-2 block font-bold text-gray-700">
        Rating
      </label>
      <div id="stars" className="flex gap-2">
        {[1, 2, 3, 4, 5].map((v, i) => (
          <Star onClick={() => setRating(v)} key={i} filled={v <= rating} />
        ))}
      </div>
    </div>
  );
};

export default StarsRating;
