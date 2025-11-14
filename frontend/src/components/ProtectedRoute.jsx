import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const location = useLocation()

    if (!isLoggedIn) {
        // redirect to login, preserving last attempted path
        // add one toast notification here for user not logged in
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}
