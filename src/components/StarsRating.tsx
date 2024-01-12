import React, { useEffect, useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

const Star: React.FC<{ filled: boolean; onClick: () => void }> = ({
  filled,
  onClick,
}) => {
  return (
    <div>
      {filled ? (
        <HiStar className="text-yellow-400" onClick={onClick} />
      ) : (
        <HiOutlineStar className="text-yellow-400" onClick={onClick} />
      )}
    </div>
  );
};

const StarsRating: React.FC<{ onChange: (rating: number) => void }> = ({
  onChange,
}) => {
  const [rating, setRating] = useState(0);
  useEffect();
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((v, i) => (
        <Star onClick={() => setRating(v)} key={i} filled={v <= rating} />
      ))}
    </div>
  );
};

export default StarsRating;
