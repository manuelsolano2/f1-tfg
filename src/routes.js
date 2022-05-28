import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Driver from './pages/Driver';
import NotFound from './pages/Page404';
import Standings from './pages/Standings';
import ConstructorStandings from './pages/ConstructorStandings';
import DashboardApp from './pages/DashboardApp';
import Circuits from "./pages/Circuits";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'driver', element: <Driver /> },
        { path: 'standings', element: <Standings /> },
        { path: 'constructors', element: <ConstructorStandings /> },
        { path: 'circuits', element: <Circuits /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
