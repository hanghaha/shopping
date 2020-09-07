// vue.config.js 脚手架的配置文件
// 是基于webpack的配置文件
// webpack是基于node的自动打包的工具
// node 暴露模块 module.exports = {}
// 自动检测该文件，并且自动运行
// module.exports = {
//   // 代理服务器的配置
//   devServer: {
//     proxy: 'http://localhost:3000/api'
//   }
// }
module.exports = {
  publicPath: './' // 默认打包的文件 是以绝对路径的形式导入的 设置完成之后 以相对路径的形式导入
}