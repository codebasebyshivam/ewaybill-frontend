import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import normalizedRoutes from '../utils/normalized.routes'

export default function NormalizedRoute() {
    const location = useLocation();
    const normalizedPath = normalizedRoutes(location.pathname);
    // console.log(normalizedPath);

    if (location.pathname !== normalizedPath) {
        return <Navigate to={normalizedPath} replace />
    }
    return <Outlet />;
}
