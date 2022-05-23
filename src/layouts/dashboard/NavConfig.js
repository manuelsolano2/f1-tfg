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
    title: 'Circuits',
    path: '/dashboard/circuits',
    icon: getIcon('maki:racetrack'),
  },
  {
    title: 'Standings',
    path: '/dashboard/standings',
    icon: getIcon('bxs:medal'),
  },
  {
    title: 'Constructors',
    path: '/dashboard/constructors',
    icon: getIcon('clarity:shield-solid'),
  },
];

export default navConfig;
