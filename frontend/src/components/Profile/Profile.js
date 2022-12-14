import React, { useState, useEffect } from 'react'
import './Profile.css'
import axios from 'axios'
import { toast } from 'react-toastify'

function Profile() {
    const [favoriteMovieArray, setfavoriteMovieArray] = useState([])

    async function fetchFavoriteMovie() {
        let payload = await axios.get("http://localhost:3001/api/user/get-user-favorite-movie", {
            headers:
            {
                authorization: "Bearer " + window.localStorage.getItem("jwtToken")
            }
        })
        setfavoriteMovieArray(payload.data.payload.favoriteMovie)
    }

    async function handleMovieDelete(id) {
        try {

            let payload = await axios.delete("http://localhost:3001/api/user/delete-favorite-movie", {
                headers:
                {
                    authorization: "Bearer " + window.localStorage.getItem("jwtToken")
                }, data: {
                    movieId: id,
                }
            }
            )
            setfavoriteMovieArray(payload.data.payload)
            toast.success("Movie deleted")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchFavoriteMovie()
    }, [])


    return (
        <div className="profile-container">
            <div>
                {
                    favoriteMovieArray.length === 0 ? <h1>Add favorite movies...</h1> : (
                        favoriteMovieArray.map((item) => {
                            return (
                                <React.Fragment>
                                    <div className="favorite-container">
                                        <div className="favorite-container-column favorite one">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="favorite-container-column favorite-two">
                                            <h1>{item.title}</h1>
                                            <div>{item.plot}</div>
                                            <div className='delete-button'>
                                                <button onClick={() => handleMovieDelete(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default Profile