//search模块的仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    searchList:{}
}
const mutations = {
    CETSEARCHLIST(state,searchList){
        state.searchList = searchList
        console.log('我是search模板数据',state.searchList);

    }
}
const actions = {
    //获取search模块数据
    async getSearchList({commit},params={}){
        //reqGetSearchInfo,这个函数在获取服务器数据时，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
       let result = await reqGetSearchInfo(params)
       if(result.code==200){
        commit("CETSEARCHLIST",result.data)
       }
    }
}
//getters为了简化数据而生
const getters= {
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
        //假如没有网络返回的就是undefind
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        return state.searchList.attrsList

    },
    trademarkList(state){
        return state.searchList.trademarkList

    }

}
export default {
    state,
    mutations,
    actions,
    getters

}