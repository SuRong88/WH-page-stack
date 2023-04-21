import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
	constantRoutes
} from '@/router';

Vue.use(Vuex);

const store = {
	getters: {},
	state: {
		token: sessionStorage.getItem('token') || '',
		navs: [],
		routes: constantRoutes,
		addRoutes: [],
		permissionBtns: [],
		userInfo: {},
		webInfo: {
			copyright: '©2014-2020广东和邦网络科技有限公司',
			// logo: 'https://img.bazhuay.com/1601016827620_138.png'
		}
	},
	mutations: {
		REMOVE_TOKEN: state => {
			state.token = '';
		},
		SET_TOKEN: (state, token) => {
			sessionStorage.setItem('token', token);
			state.token = token;
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		},
		SET_NAVS: (state, navs) => {
			state.navs = navs;
		},
		SET_ROUTES: (state, routes) => {
			state.addRoutes = routes;
			state.routes = constantRoutes.concat(routes);
		},
		SET_PERMISSIONBTNS: (state, permissionBtns) => {
			state.permissionBtns = permissionBtns;
			// console.log('权限按钮：', permissionBtns);
		}
	},
	actions: {
		getModules({
			commit
		}, url) {
			return Vue.prototype.$get(url);
		},
		generateRoutes({
			commit
		}, asyncRoutes) {
			return new Promise(resolve => {
				console.log('设置routes');
				commit('SET_ROUTES', asyncRoutes);
				resolve(asyncRoutes);
			});
		}
	}
};

export default new Vuex.Store(store);
