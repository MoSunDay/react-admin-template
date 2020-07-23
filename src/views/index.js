import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const Ticket = Loadable({
  loader: () => import('./Ticket'),
  loading: Loading,
})

const TicketDetail = Loadable({
  loader: () => import('./Ticket/Detail'),
  loading: Loading,
})

const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
})

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
})

const TicketCreate = Loadable({
  loader: () => import('./TicketCreate'),
  loading: Loading,
})

const Notify = Loadable({
  loader: () => import('./Notify'),
  loading: Loading,
})

const NotifyEdit = Loadable({
  loader: () => import('./Notify/Edit'),
  loading: Loading,
})

const Deploy = Loadable({
  loader: () => import('./Deploy'),
  loading: Loading,
})

const DeployCommonConf = Loadable({
  loader: () => import('./Deploy/DeployCommonConf'),
  loading: Loading,
})

const DeployWeight = Loadable({
  loader: () => import('./Deploy/DeployWeight'),
  loading: Loading,
})

const DeployReleaseLog = Loadable({
  loader: () => import('./Deploy/DeployReleaseLog'),
  loading: Loading,
})

const DeployServiceStatus = Loadable({
  loader: () => import('./Deploy/DeployServiceStatus'),
  loading: Loading,
})

const DeployRelease = Loadable({
  loader: () => import('./Deploy/DeployRelease'),
  loading: Loading,
})

const DeployModfiyInstance = Loadable({
  loader: () => import('./Deploy/DeployModfiyInstance'),
  loading: Loading,
})

const DeployConfig = Loadable({
  loader: () => import('./Deploy/DeployConfig'),
  loading: Loading,
})

const DeployRemoveAlertWindows = Loadable({
  loader: () => import('./Deploy/DeployRemoveAlertWindows'),
  loading: Loading,
})

const DeployHpaConf = Loadable({
  loader: () => import('./Deploy/DeployHpaConf'),
  loading: Loading,
})

const DeployGray = Loadable({
  loader: () => import('./Deploy/DeployGray'),
  loading: Loading,
})

const DeployServiceVersion = Loadable({
  loader: () => import('./Deploy/DeployServiceVersion'),
  loading: Loading,
})

const DeployServiceVersionDetail = Loadable({
  loader: () => import('./Deploy/DeployServiceVersionDetail'),
  loading: Loading,
})

const DeployReleaseLogView = Loadable({
  loader: () => import('./Deploy/DeployReleaseLogView'),
  loading: Loading,
})

const DeployReleaseLogRealtime = Loadable({
  loader: () => import('./Deploy/DeployReleaseLogRealtime'),
  loading: Loading,
})

// import Ticket from './Ticket'
// import Dashborad from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Setting from './Setting'

export {
  Ticket,
  TicketDetail,
  Dashboard,
  Login,
  NotFound,
  TicketCreate,
  Notify,
  NotifyEdit,
  Deploy,
  DeployCommonConf,
  DeployWeight,
  DeployReleaseLog,
  DeployServiceStatus,
  DeployRelease,
  DeployModfiyInstance,
  DeployConfig,
  DeployRemoveAlertWindows,
  DeployHpaConf,
  DeployGray,
  DeployServiceVersion,
  DeployServiceVersionDetail,
  DeployReleaseLogView,
  DeployReleaseLogRealtime
}
