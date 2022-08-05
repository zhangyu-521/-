import { reqGoodsInfo ,reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块uuid，生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
   async getGoodInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code = 200){
        commit('GETGOODINFO',result.data)
       }
    },
    //将产品添加到购物车中
    //一个函数加一个async返回的一定是一个promise
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
       let result =  await reqAddOrUpdateShopCart(skuId,skuNum)
       if(result.code==200){
        //非空字符串代表成功
        return'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
     

    }

}
const getters = {
    //路径导航简化数组
    categoryView(state){
        //goodInfo开始是个空对象，categoryView里没有name属性的话就会报错所以或空
        return state.goodInfo.categoryView || {}

    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}