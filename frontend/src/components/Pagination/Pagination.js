import React, { useState, useEffect } from "react";

import "./Pagination.css";

function Pagination({ totalMovieResults, page, setPage }) {

    const [currentPaginationArray, setCurrentPaginationArray] = useState([]);
    const [startingPosition, setStartingPoistion] = useState(0);

    const [reachedTheEnd, setReachedTheEnd] = useState(false)
    const [reachedTheFront, setReachedTheFront] = useState(false)

    useEffect(() => {
        renewPagination();
    }, [reachedTheEnd, reachedTheFront]);

    useEffect(() => {
        if (
            page ===
            currentPaginationArray[currentPaginationArray.length - 1] + 1
        ) {
            setStartingPoistion((startingPosition) => startingPosition + 10);

            setReachedTheEnd(true);
        } else {
            setReachedTheEnd(false);
        }

        if (page === currentPaginationArray[0] - 1) {
            setStartingPoistion((startingPosition) => startingPosition - 10);
            setReachedTheFront(true);
        } else {
            setReachedTheFront(false);
        }
    }, [page]);

    function renewPagination() {
        console.log(totalMovieResults);
        let makeCurrentPaginationArray = totalMovieResults.slice(
            startingPosition,
            startingPosition + 10
        );

        console.log(makeCurrentPaginationArray);
        setCurrentPaginationArray(makeCurrentPaginationArray);
    }

    function selectedPage(e) {
        const pageNumber = Number(e.target.textContent)
        setPage(pageNumber)
    }

    function handleNext() {
        setPage((page) => page + 1)
    }

    function handlePrev() {
        setPage((page) => page - 1)
    }

    return (
        <div className="pagination-container">
            <button className={`${page === 1 && "disabled"}`} onClick={handlePrev}>Prev</button>

            {currentPaginationArray.map((item) => {
                return (
                    <button className={`paginationItem ${page === item ? "active" : undefined}`} key={item} onClick={selectedPage}>
                        <span>{item}</span>
                    </button>
                );
            })}

            <button className={`${page === totalMovieResults[totalMovieResults.length - 1] && "disabled"}`} onClick={handleNext}>Next</button>
        </div>
    );
}

export default Pagination;