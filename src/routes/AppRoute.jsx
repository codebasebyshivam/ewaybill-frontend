import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// ✅ Lazy-load all routes
const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const NormalizeRoutes = lazy(() => import('./NormalizedRoute')); // also lazy-load layout if heavy
const Dashboard = lazy(()=> import('../pages/Dashboard'));


// ✅ Router configuration
const routes = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading route...</div>}>
        <NormalizeRoutes />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>Loading Page Not Found...</div>}>
        <PageNotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading Login...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

// ✅ App-level route wrapper
export default function AppRoute() {
  return (
    <RouterProvider router={routes} />
  );
}
