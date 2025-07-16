import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SelectCompany from '../pages/SelectCompany';
import PageNotFound from '../pages/PageNotFound';
import NormalizeRoutes from './NormalizedRoute';
import LoginPage from '../pages/LoginPage';

const routes = createBrowserRouter([
  {
    path: '*', // Match all routes first
    element: <NormalizeRoutes />, // Normalize here
    children: [
      {
        path: 'select-company', // This matches `/`
        element: <SelectCompany />,
      },
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '*', // Catch-all for unmatched routes
        element: <PageNotFound />,
      },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={routes} />;
}
