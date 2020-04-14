import { 
    Login,
    Dashboard,
    NotFound,
    Setting, 
    Article,
    ArticleEdit,
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
        pathname: '/admin/article',
        component: Article,
        title: '工单管理',
        icon: EditOutlined,
        exact: true,
        isTop: true
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit,
        title: '工单编辑',
        icon: EditOutlined,
        isTop: false
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title: '系统设置',
        icon: SettingFilled,
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