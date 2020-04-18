import { 
    Login,
    Dashboard,
    NotFound,
    TicketCreate, 
    Ticket,
    TicketDetail,
    Notify
} from "../views";

import {
    HomeOutlined,
    SettingFilled,
    EditOutlined,
  } from '@ant-design/icons';


const commonRoutes = [
    {
        pathname: '/login',
        component: Login,
    },
    {
        pathname: '/404',
        component: NotFound,
    },
]

const privateRoutes = [
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: '仪表盘',
        icon: HomeOutlined,
        isTop: true
    },
    {
        pathname: '/admin/ticket',
        component: Ticket,
        title: '工单管理',
        icon: SettingFilled,
        exact: true,
        isTop: true
    },
    {
        pathname: '/admin/ticket/detail/:id',
        component: TicketDetail,
        title: '工单编辑',
        icon: SettingFilled,
        isTop: false
    },
    {
        pathname: '/admin/ticket/create',
        component: TicketCreate,
        title: '创建工单',
        icon: EditOutlined,
        isTop: true
    },
    {
        pathname: '/admin/notify',
        component: Notify,
        title: '通知中心',
        icon: SettingFilled,
        isTop: false
    },
]

export {
    commonRoutes,
    privateRoutes
}