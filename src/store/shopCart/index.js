import { reqUpdateCheckedByid, reqCartList, reqDeleteCartById } from "@/api"

const state = {
    cartList: []
}
const actions = {
    //获取购物车列表数据
    async getCartList() {
        let result = await reqCartList();
        if (result.code == 200) {
            this.commit('GETCARTLIST', result.data)
        }

    },
    //删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 修改商品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }, context) {
        // context上下文，小仓库里面commit，state，dispatch，getters等等都有
        //获取购物车中所有的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCartListBySkuId', item.skuId)
                PromiseAll.push(promise)
            }

        })
        // PromiseAll中有一个失败就返回失败
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
           let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked 
            })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)

    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}

export default {
    state,
    actions,
    mutations,
    getters
}