Vue.config.productionTip = false; // vue 在启动时生成生产提示
Vue.config.silent = false; // vue生产环境提示

import Vue from 'vue';

import App from './App.vue';
import api from './api/index';
import router from './router';
import store from './store';

import request from './utils/request';
import formCheck from './utils/formCheck';
import layout from './utils/layout';
import directive from './utils/directive';
import clipboard from "./utils/clipboard";
import ElementUI from './utils/elementUI';

import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/css/main.less';
import './assets/css/base.less';
import './assets/css/icon.css';
import './assets/css/common.less';
import './assets/css/table-container.less';

import 'babel-polyfill';

import DateRangePicker from '@/components/date-range-picker'

Vue.use(formCheck);
Vue.use(layout);
Vue.use(directive);
Vue.use(clipboard);
Vue.use(ElementUI);

Vue.component('DateRangePicker', DateRangePicker)

//vue原型链挂载总线
Vue.prototype.$Bus = new Vue();

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
