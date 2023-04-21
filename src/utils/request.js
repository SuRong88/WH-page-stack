import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 60000;
const req1 = axios.create();
const req2 = axios.create();

Vue.prototype.$post2 = post2;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$del = del;
Vue.prototype.$put = put;

//http request 拦截器
req1.interceptors.request.use(
	config => {
		config.headers = {
			token: sessionStorage.getItem('token'),
			'Content-Type': 'application/json;charset=UTF-8'
		};
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

req2.interceptors.request.use(
	config => {
		config.headers = {
			token: sessionStorage.getItem('token'),
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		};
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

//http response 拦截器
req1.interceptors.response.use(
	res => {
		window.vm.loadEnd();
		if (res.data.code !== 0) {
			res.data.code == 401 && setTimeout(() => {
				sessionStorage.removeItem('token');
				window.location.href = window.location.origin + '/login';
			}, 1500);
			return Promise.reject(res.data);
		}
		return res.data;
	},
	err => {
		window.vm.loadEnd();
		err.message = '接口请求出错';
		return Promise.reject(err);
	}
);

req2.interceptors.response.use(
	res => {
		window.vm.loadEnd();
		if (res.data.code !== 0) {
			res.data.code == 401 && setTimeout(() => {
				sessionStorage.removeItem('token');
				window.location.href = window.location.origin + '/login';
			}, 1500);
			return Promise.reject(res.data);
		}
		return res.data;
	},
	err => {
		window.vm.loadEnd();
		err.message = '接口请求出错';
		return Promise.reject(err);
	}
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		req1.get(url, {
			params: filterQuery(params)
		}).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		req1.post(url, data).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

function post2(url, data = {}) {
	data = qs.stringify(data);
	return new Promise((resolve, reject) => {
		req2.post(url, data).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function del(url, data = {}) {
	return new Promise((resolve, reject) => {
		req1.delete(url, data).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		req1.put(url, data).then(
			res => {
				resolve(res);
			},
			err => {
				reject(err);
			}
		);
	});
}

function filterQuery(data) {
	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
			data[key] === '' && delete data[key];
		}
	}
	return data;
}
