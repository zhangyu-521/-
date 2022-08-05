const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 上线打包时不会生成map文件，map文件的作用是提升那行那列报错，所以可以不要
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint校验工具
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
