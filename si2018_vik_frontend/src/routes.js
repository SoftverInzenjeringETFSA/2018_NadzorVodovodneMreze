import {
  Alerts,
  Badges,
  Breadcrumbs,
  ButtonDropdowns,
  ButtonGroups,
  Buttons,
  Cards,
  Carousels,
  Charts,
  Collapses,
  Colors,
  Dashboard,
  Dropdowns,
  Flags,
  FontAwesome,
  Forms,
  Jumbotrons,
  ListGroups,
  Modals,
  Navbars,
  Navs,
  Paginations,
  Popovers,
  ProgressBar,
  SimpleLineIcons,
  BrandButtons,
  Switches,
  Tables,
  Tabs,
  Tooltips,
  Typography,
  Widgets,
} from './views';
import Full from './containers/Full';
import Pipes from "./views/Pipes/Pipes";
import PipesList from "./views/Pipes/PipesList/PipesList";
import ActivityReport from "./views/Reporting/ActivityReport/ActivityReport";
import Vodostaji from './views/Vodostaji/Vodostaji';
import VodostajiList from './views/Vodostaji/VodostajiList/VodostajiList';
import Login from './views/Pages/Login/Login';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/pipes', exact: true, name: 'Cijevi', component: Pipes },
  { path: '/pipes/add', exact: true, name: 'Nova cijev', component: Dashboard },
  { path: '/pipes/list', exact: true, name: 'Spisak cijevi', component: PipesList },

  { path: '/vodostaji', exact: true, name: 'Vodostaji', component: Vodostaji},
  { path: '/vodostaji/add', exact: true, name: 'Novi vodostaj', component: Dashboard},
  { path: '/vodostaji/list', exact: true, name: 'Spisak vodostaja', component: VodostajiList},

  { path: '/mstations', exact: true, name: 'Home', component: Dashboard },
  { path: '/mstations/add', exact: true, name: 'Home', component: Dashboard },
  { path: '/mstations/list', exact: true, name: 'Home', component: Dashboard },

  { path: '/failures', exact: true, name: 'Home', component: Dashboard },
  { path: '/failures/add', exact: true, name: 'Home', component: Dashboard },
  { path: '/failures/list', exact: true, name: 'Home', component: Dashboard },

  { path: '/constructions', exact: true, name: 'Home', component: Dashboard },
  { path: '/constructions/add', exact: true, name: 'Home', component: Dashboard },
  { path: '/constructions/list', exact: true, name: 'Home', component: Dashboard },

  { path: '/administration', exact: true, name: 'Home', component: Dashboard },
  { path: '/administration/reports', exact: true, name: 'Home', component: Dashboard },
  { path: '/administration/settings', exact: true, name: 'Home', component: Dashboard },

  { path: '/', exact: true, name: 'Home', component: Full },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },


  { path: '/reporting/activity', name: 'Izvještaj aktivnosti', component: ActivityReport },

  // template leftovers, remove with time as things become unnecessary
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousels', component: Carousels },
  { path: '/base/collapses', name: 'Collapses', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'ListGroups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'ButtonDropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'ButtonGroups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: Flags },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
];

export default routes;
