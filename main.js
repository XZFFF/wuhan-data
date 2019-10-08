import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.apiUrl = 'http://192.168.124.4:8080/wuhan_data1/';
Vue.prototype.apiUrl = 'http://59.208.244.108:4708/wuhan-data-panel/';
// http://59.208.244.108:8080/wuhan-data-panel/
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
