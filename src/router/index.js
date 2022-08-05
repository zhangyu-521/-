
import VueRouter from 'vue-router';
import Vue from 'vue';
import routes from './routes';
import store from '@/store'
Vue.use(VueRouter)

let router =  new VueRouter({
    mode:'history',
    //命名为routers页面加载不出来不知为何
    routes,
    scrollBehavior(to,from,savedPosition){
    //    跳转后滚动条在最上方
        return {y:0}
    }

})

// 全局守卫，前置守卫，
router.beforeEach(async (to,from,next)=>{
  // to：跳转到那个路由的信息
  // from：从哪来
  // next：放行函数，放行到指定路由位置
// next()
  // 用户登录了，才会有token
let token = store.state.user.token
let name = store.state.user.userInfo.name
if(token){
  // 登录后去不了login
  if(to.path=='/login'){
    next('/home')
  }else{
    // 登录了，去的不是login,同时带着用户信息，就放行
    // 如果有放行
    if(name) {
      next()
    }else{
      // 没有用户信息
    try{
      await store.dispatch('getUserInfo')
    // 放行
    }catch(error){
      // token失效，清除token，重新登录
      await store.dispatch('userLogout')
      next('/login')


    }


    }

    next()
  }
}else{
  // next()
  // 未登录:不能去交易相关，不能去支付相关，不能去个人中心
  // 去不是上面的这些路由放行
  let toPath = to.path
  if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 || toPath.indexOf('/shopcart')!=-1){
    // 把未登录的时候想去的二没有去成的信息，存储于地址栏中

    next('/login?uu='+toPath)

  }
  next()
  
}
})

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


export default router