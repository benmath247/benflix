import React, { useState, useEffect } from "react";

import "./Pagination.css";

function Pagination({ totalMovieResults }) {
    const [currentPaginationArray, setCurrentPaginationArray] = useState([]);
    const [startingPosition, setStartingPoistion] = useState(0);

    useEffect(() => {
        renewPagination();
    }, []);

    function renewPagination() {
        console.log(totalMovieResults);
        let makeCurrentPaginationArray = totalMovieResults.slice(
            startingPosition,
            startingPosition + 10
        );

        console.log(makeCurrentPaginationArray);
        setCurrentPaginationArray(makeCurrentPaginationArray);
    }

    return (
        <div className="pagination-container">
            <button>Prev</button>

            {currentPaginationArray.map((item) => {
                return (
                    <button key={item}>
                        <span>{item}</span>
                    </button>
                );
            })}

            <button>Next</button>
        </div>
    );
}

export default Pagination;