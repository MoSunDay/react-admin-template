import Loadable from 'react-loadable';
import Loading from '../components/Loading';


const Ticket = Loadable({
    loader: () => import('./Ticket'),
    loading: Loading,
});

const TicketDetail = Loadable({
    loader: () => import('./Ticket/Detail'),
    loading: Loading,
});

const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading,
});

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
});

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
});

const TicketCreate = Loadable({
    loader: () => import('./TicketCreate'),
    loading: Loading,
});

const Notify = Loadable({
    loader: () => import('./Notify'),
    loading: Loading,
});

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
    Notify
}