// 路由的配置信息
// import Home from '../pages/Home'
// import Search from '../pages/Search'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Detail from '../pages/Detail/'
// import AddCartSuccess from '../pages/AddCartSuccess'
// import ShopCart from '../pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// 使用了路由的懒加载，提高了效率
export default [
    {
        name: 'Center',
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: { show: true },
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder'),
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        name: 'PaySuccess',
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        name: 'Pay',
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'Trade',
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path=="/shopcart"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'ShopCart',
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: true }
    },


    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid?',
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component:()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    //重定向，当项目跑起来时，立马访问指定页面
    {
        path: '*',
        redirect: "/home"
    }

]