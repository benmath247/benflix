import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import jwtDecode from "jwt-decode";

function UserAuthHook(loggedin, notLoggedIn) {
    const navigate = useNavigate()
    useEffect(() => {
        const jwtToken = window.localStorage.getItem("jwtToken");
        if (jwtToken) {
            let decodedToken = jwtDecode(jwtToken);

            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                window.localStorage.removeItem("jwtToken");
                navigate(notLoggedIn);
            } else {
                navigate(loggedin)
            }
        } else {
            navigate(notLoggedIn);
        }
    }, []);
}

export default UserAuthHook