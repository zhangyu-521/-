//对于axios进行2次封装
import axios from "axios";
import nProgress from "nprogress";
import store from '@/store'
//start表示进度条开始
//done表示进度条结束
import 'nprogress/nprogress.css'

//利用axios对象的方法create，去创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/api',
    //代表请求超时的时间5s
    timeout:5000,

})
//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送出去之前做出一些事情
requests.interceptors.request.use((config)=>{
  //config:配置对象，对象里面有一个属性很重要，header请求头
 
  if(store.state.Detail.uuid_token){
    config.headers.userTempId=store.state.Detail.uuid_token
   
  }

  // 判断需要携带token给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  nProgress.start();
 
  return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
   nProgress.done()
    return res.data

},(error)=>{
    //响应失败的回调函数
     return Promise.reject(new Error('faile'))
})






export default requests