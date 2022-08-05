import Vue from "vue";
import  vuex  from "vuex";
//需要使用插件一次
Vue.use(vuex)
//引入小仓库
import Home from "./Home";
import search from "./search";
import Detail from "./Detail";
import shopCart from "./shopCart";
import user from "./user";
import trade from "./trade";
//对外暴露Store类的一个实例
export default new vuex.Store({
    modules:{
        Home,
        search,
        Detail,
        shopCart,
        user,
        trade
    }


})