import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

// Vue.prototype.apiUrl = 'http://59.208.244.108:4708/wuhan-data-panel/'; // 服务器部署
Vue.prototype.apiUrl = 'http://localhost:8080/wuhan_data1/'; //本机IDE
// Vue.prototype.apiUrl = 'http://192.168.124.17:8080/wuhan-data-panel'; // 陈伟本机war
// Vue.prototype.apiUrl = 'http://192.168.124.17:8080/wuhan_data1/';//陈伟本机IDE

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
