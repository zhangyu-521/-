//当前这个模块，Api进行统一管理
import requests from "./ajax";
import ajax from "./ajax";
import mockRequests from './mockAjax'

//三级联动接口
///api/product/getBaseCategoryList  get 无参数
export const reqCategoryList = ()=>
    //发请求axios发送请求返回结果Promise对象
 ajax({url:'/product/getBaseCategoryList',method:'get'})


export const reqGetBannerList = ()=>mockRequests.get('/banner')



//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')


//获取搜索模块数据 地址：/api/list post请求
//当前这个接口文档，给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})


// 获取产品详细信息的接口 /api/item/{ skuId } get请求
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${ skuId }`,method:'get'})


//将产品添加到购物车中，（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`, method:"post"})


//获取购物车列表数据的接口
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})


//删除购物车某个产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})


//修改商品的选中状态接口
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})


//获取验证码/api/user/passport/sendCode/phone
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})


//注册接口
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:"post"})


//登录接口
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})


// 获取用户信息，需要带着用户的token
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})


// r退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})


// 获取用户地址信息
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"})


// 获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})


// 提交订单接口(不用vuex)
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})



// 获取订单支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})



// 获取订单支付状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})


// 获取个人中心的数据
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})