// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App'
import router from '@/router'
import MyHttpServer from '@/plugins/http'
import moment from 'moment'
import MyBrand from './components/cuscom/myBrand'

import '@/assets/css/index.scss'

Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false

Vue.filter('timeDate', (value) => {
  return moment(value).format('YYYY-MM-DD')
})

Vue.component(MyBrand.name, MyBrand)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
