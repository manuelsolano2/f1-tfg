// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Drivers',
    path: '/dashboard/driver',
    icon: getIcon('mdi:racing-helmet'),
  },
  {
    title: 'Standings',
    path: '/dashboard/standings',
    icon: getIcon('bxs:medal'),
  },
  {
    title: 'Circuits',
    path: '/dashboard/blog',
    icon: getIcon('maki:racetrack'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
