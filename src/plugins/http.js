import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/mng/v1'
  // 添加示例方法
  Vue.prototype.$http = axios
  axios.defaults.withCredentials = false
}

export default MyHttpServer
