import React, { Children } from 'react'
import { Navigate } from "react-router-dom"
import UserAuthHook from "../hooks/UserAuthHook"

function PrivateRoute({ children }) {
    const [, , checkToken] = UserAuthHook();

    if (checkToken()) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute