import { 
    Login,
    Dashboard,
    NotFound,
    Setting, 
    Article
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
        pathname: '/admin/article',
        component: Article,
        title: '工单管理',
        icon: EditOutlined,
        isTop: true
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title: '系统设置',
        icon: SettingFilled,
        isTop: true
    },
]

export {
    commonRoutes,
    privateRoutes
}