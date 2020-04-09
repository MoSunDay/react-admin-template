import { 
    Login,
    Dashborad,
    NotFound,
    Setting, 
    Article
} from "../views";


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
        component: Dashborad,
    },
    {
        pathname: '/admin/article',
        component: Article,
    },
    {
        pathname: '/admin/setting',
        component: Setting,
    },
]

export {
    commonRoutes,
    privateRoutes
}