//登录与注册模块
import {reqUserInfo, reqGetCode,reqUserRegister,reqUserLogin, reqLogout} from "@/api"
import { setToken ,getToken,removeToken} from "@/utils/token"
const state = {
    code:'',
    token: getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
      state.token = token

    },
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo

    },
    // 清除state
    CLEAR(state){
      state.token = ''
      state.userInfo = ''
      // 清空本地存储
      removeToken()

    }
}
const actions = {
    //获取验证码
   async getCode({commit},phone){
      let result = await reqGetCode(phone)
      if(result.code==200){
        this.commit("GETCODE",result.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
   async userRegister({commit},user){
     let result = await reqUserRegister(user)
     console.log(result);
     if(result.code ==200){
      
      return 'ok'
     }else{
      return Promise.reject(new Error('faile'))
     }

    },
    // 登录页面（token）
    // commit这是用到了ES6的参数解构
   async userLogin({commit},user){
    let result = await reqUserLogin(user)
        // 服务器下发token，用户唯一标识
        // 将来经常通过带token找服务器用户信息进行展示
        if(result.code==200){
         commit("USERLOGIN",result.data.token)
         // 持久化存储token
         setToken(result.data.token)
          return 'ok'
        }else{
          return Promise.reject(new Error("faile"))
        }
    },
    // 获取用户信息，（token）
   async getUserInfo({commit}){
    let result =  await reqUserInfo()
    if(result.code==200){
      commit('GETUSERINFO',result.data)
      
      
      
      return'ok'
    }else{
      return Promise.reject(new Error('获取用户信息失败'))
    }
    },
    // 退出登录
   async userLogout({commit}){
    // 向服务器发送请求。通知服务器清除数据token
     let result = await reqLogout()
    //  action里面不能操作state
     if(result.code==200){
      commit("CLEAR")
      return 'ok'
     }else{
      return Promise.reject.apply(new Error("退出失败"))
     }
    },
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters

}