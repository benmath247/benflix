import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import apiKey from '../Movie/apikey';

function MovieDetail() {
    let {title} = useParams();
    async function fetchMovieDetail(){
        try{
            let resp = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey()}`)
            console.log(resp)
        } catch {}
    }

    useEffect(() => {
      fetchMovieDetail()
    
    }, [])
    
    return (
        <div>{title}</div>
    )
}

export default MovieDetail