import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiUrl = 'http://192.168.1.101:8080/wuhan_data1/';
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
