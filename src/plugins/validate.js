// vee-validate插件表单验证区域
import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        // 提示信息为中文
        ...zh_CN.messages,
        // 确认密码相同
        is:(field)=>`${field}必须密码相同`
    },
    attributes:{
        // 给校验的field属性名映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        agree:'协议'
    }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })
