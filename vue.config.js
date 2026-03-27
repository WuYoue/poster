module.exports = {
  transpileDependencies: [
    'openai', 
    'defu', 
    'destr'
  ],
  // 🚨 新增：配置本地代理服务器
  devServer: {
    proxy: {
      // 当你请求以 /moonshot-api 开头的地址时，触发代理
      '/moonshot-api': {
        target: 'https://api.moonshot.cn', // 真实的目标服务器地址
        changeOrigin: true, // 开启欺骗：把请求头里的 host 伪装成 api.moonshot.cn
        pathRewrite: {
          '^/moonshot-api': '' // 发送请求时，把 /moonshot-api 抹掉
        }
      }
    }
  }
}