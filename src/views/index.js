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
    loader: () => import('./DeployCommonConf'),
    loading: Loading,
})

const DeployWeight = Loadable({
    loader: () => import('./DeployWeight'),
    loading: Loading,
})

const DeployReleaseLog = Loadable({
    loader: () => import('./DeployReleaseLog'),
    loading: Loading,
})

const DeployServiceStatus = Loadable({
    loader: () => import('./DeployServiceStatus'),
    loading: Loading,
})

const DeployRelease = Loadable({
    loader: () => import('./DeployRelease'),
    loading: Loading,
})

const DeployModfiyInstance = Loadable({
    loader: () => import('./DeployModfiyInstance'),
    loading: Loading,
})

const DeployConfig = Loadable({
    loader: () => import('./DeployConfig'),
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
}
