import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// ✅ Lazy-load all routes
const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const NormalizeRoutes = lazy(() => import('./NormalizedRoute')); // also lazy-load layout if heavy
const HomePageSkeleton = lazy(
  () => import('../components/layout/home.page/skeletons/HomePageSkeleton')
);

const Profile = lazy(() => import('../pages/Profile'));
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const Ewaybill = lazy(() => import('../features/ewaybill/Ewaybill'));
const RC = lazy(() => import('../features/rc/RC'));
const DrivingLicense = lazy(() => import('../features/dl/DrivingLicense'));
const Fastag = lazy(() => import('../features/fastag/Fastag'));
const PageNotFoundSkeleton = lazy(
  () => import('../components/layout/home.page/skeletons/PageNotFoundSkeleton')
);
const LoginPageSkeleton = lazy(
  () => import('../components/layout/login.page/skeleton/LoginPageSkeleton')
);

const profile_routes = [
  {
    index: true,
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: 'ewaybill',
    element: (
      <Suspense fallback={<div>Loading Ewaybill...</div>}>
        <Ewaybill />
      </Suspense>
    ),
  },
  {
    path: 'rc',
    element: (
      <Suspense fallback={<div>Loading RC...</div>}>
        <RC />
      </Suspense>
    ),
  },
  {
    path: 'dl',
    element: (
      <Suspense fallback={<div>Loading dl...</div>}>
        <DrivingLicense />
      </Suspense>
    ),
  },
  {
    path: 'fastag',
    element: (
      <Suspense fallback={<div>Loading fastag...</div>}>
        <Fastag />
      </Suspense>
    ),
  },
];
// ✅ Router configuration
const main_routes = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        }
      >
        <NormalizeRoutes />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<PageNotFoundSkeleton />}>
        <PageNotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<HomePageSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoginPageSkeleton />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div>Loading Profile...</div>}>
            <Profile />
          </Suspense>
        ),
        children: profile_routes,
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageNotFoundSkeleton />}>
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

// ✅ App-level route wrapper
export default function AppRoute() {
  return <RouterProvider router={main_routes} />;
}
