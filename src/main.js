import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from '@/router'
import store from '@/store'

// 引入插件(懒加载)
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/atm.gif'
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:atm
})

// 引入表单校验插件
import "@/plugins/validate"




//三级联动的组件--全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//轮播图全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
// 分页全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
import '@/mock/mockServe'
import "swiper/css/swiper.css"
// import {reqCategoryList} from '@/api'
// reqCategoryList()
Vue.config.productionTip = false



// 引入elementui,两种引入方法
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 统一接收接口api文件夹里面的全部文件
import * as API from '@/api'
 new Vue({
  
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    // 挂载
    Vue.prototype.$API = API
  },
  router,
  store,

}).$mount('#app')
