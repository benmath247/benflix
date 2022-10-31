import React, { useState, useEffect } from "react";

import "./Pagination.css";

function Pagination({ totalMovieResults, page, setPage }) {

    const [reachedTheEnd, setReachedTheEnd] = useState(false)

    useEffect(() => {
        if (page>=(totalMovieResults/10)){
            setReachedTheEnd(true)
        } else {
            setReachedTheEnd(false)
        }
    }, [page])

    function handleNext() {
        setPage((page) => page + 1)
    }

    function handlePrev() {
        setPage((page) => page - 1)
    }
    
    return (
        <div className="pagination-container">
            <button className={`${page === 1 && "disabled"}`} onClick={handlePrev}>Prev</button>

            <button className={`${reachedTheEnd && "disabled"}`} onClick={handleNext}>Next</button>
        </div>
    );
}

export default Pagination;