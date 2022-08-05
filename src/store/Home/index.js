
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
//home模块小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]


}
const mutations = {
    CATEGORYLIST(state,result){
        return state.categoryList = result;
    },
    GETBANNERLIST(state,result){
        return state.bannerList = result
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList

    }

}
const actions = {
//返回的是prmise数据，需用async和await这对cp接收
    async categoryList({commit}){
        let result = await reqCategoryList();
        console.log('三级组件数据',result);
        if(result.code==200){
            commit('CATEGORYLIST',result)
        }
    },

    //获取首页轮播图数据
    async getBannerList({commit}){
       let result =  await reqGetBannerList()
       console.log('轮播图数据',result);
       if(result.code==200){
        commit('GETBANNERLIST',result.data)
       }


    },
    //获取floor数据
    async getFloorList({commit}){
       let result = await reqFloorList()
       if(result.code==200){
        commit('GETFLOORLIST',result.data)
       }
    }
}
const getter = {}
export default {
    state,
    mutations,
    actions,
    getter

}