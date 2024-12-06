import React, {useState} from "react";
import {FaStar} from "react-icons/fa";

const StarRating = ({rating, setRating}) => {
    const[hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) =>{
                const rateVal = i + 1;
                return (
                    <label key={i}>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={rateVal} 
                            onClick={() =>setRating(rateVal)}
                            />
                        <FaStar 
                            className="starRate" 
                            size={20}
                            color={rateVal <= (hover || rating) ? "#ffb121" : "#858581"}
                            onMouseEnter={() => setHover(rateVal)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};
export default StarRating;