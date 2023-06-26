import Vue from 'vue';
let scrollTopMap = {};

// if (window.sessionStorage.VUE_NAVIGATION) {
//   routes = JSON.parse(window.sessionStorage.VUE_NAVIGATION)
// }

export function setScrollTop(key, isTabbar = false) {
    const keyName = isTabbar ? key.split('?')[0] : key;
    scrollTopMap[keyName] = document.documentElement.scrollTop;
    console.log('scrollTopMap', scrollTopMap);
}

export function getScrollTop(key, isTabbar = false) {
    const keyName = isTabbar ? key.split('?')[0] : key;
    Vue.prototype.$nextTick(() => {
        document.documentElement.scrollTop = scrollTopMap[keyName] || 0;
    });
}

export function removeScrollTop(key, isTabbar = false) {
    const keyName = isTabbar ? key.split('?')[0] : key;
    delete scrollTopMap[keyName];
    console.log('scrollTopMap', scrollTopMap);
}

export default scrollTopMap;
