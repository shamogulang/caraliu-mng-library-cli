// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入基础样式
import './assets/base.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyHttpServer from './plugins/http'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false
// 加入日期解析插件
Vue.filter('dateformat', (v) => {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
