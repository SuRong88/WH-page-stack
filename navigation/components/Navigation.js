import Routes from '../routes';
import scrollTopMap, {removeScrollTop} from '../scrollTopMap'
import { getKey, matches, remove, getFirstComponentChild } from '../utils';

// 替换tabbar缓存
const updateTabbarCache = (routes, cache, keys, key, oldKey, vnode) => {
    const isBack = routes.includes(key)
    const name = key.split('?')[0]
    const replace = (_key, _oldKey) => {
        vnode.key = vnode.isComment ? 'comment' : vnode.tag;
        vnode.key = `__navigation-${_key}-${vnode.key}`;
        cache[_key] = cache[_oldKey]
        cache[_key].key = vnode.key
        delete cache[_oldKey]

        remove(keys, _oldKey)
        keys.push(_key)
    }
    if(isBack) {
        for(let _oldKey in cache) {
            const _oldName = _oldKey.split('?')[0]
            if(_oldKey !== key && _oldName === name) {
                replace(key, _oldKey)
                break;
            }
        }
    } else { // foward or replace
        replace(key, oldKey)
    }
};

// 清除超出缓存
const pruneCacheEntry = (cache, keys, tabbars) => {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const name = key.split('?')[0]
        if (!tabbars.includes(name)) {
            const vnode = cache[key];
            vnode && vnode.componentInstance.$destroy();
            delete cache[key];

            remove(keys, key);
            console.log('pruneCacheEntry', name, key);
            break;
        }
    }
};

export default keyName => {
    return {
        name: 'navigation',
        abstract: true,
        props: {
            tabbars: {
                type: Array,
                default: () => []
            },
            max: {
                type: Number,
                default: 99
            }
        },
        data: () => ({
            routes: Routes
        }),
        created() {
            this.cache = {};
            this.keys = [];

            if(this.max <= this.tabbars.length) {
                console.error('vue-navigation[warn]: max value must over tabbars length')
            }

            this.$watch('routes', function (val) {
                for (const key in this.cache) {
                    if (!matches(val, key)) {
                        const name = key.split('?')[0]
                        if(!this.tabbars.includes(name)) {
                            const vnode = this.cache[key];
                            vnode && vnode.componentInstance.$destroy();
                            delete this.cache[key];
                            remove(this.keys, key);
                        } else {
                            // 回退时, 把tabbar页面放在keys的最前面
                            remove(this.keys, key);
                            this.keys.unshift(key)
                        }
                    }
                }

                for (const key in scrollTopMap) {
                    if (!matches(val, key)) {
                        const name = key.split('?')[0]
                        if(!this.tabbars.includes(name)) {
                            removeScrollTop(key, this.tabbars.includes(name))
                        } 
                    }
                }
            });
        },
        destroyed() {
            for (const key in this.cache) {
                const vnode = this.cache[key];
                vnode && vnode.componentInstance.$destroy();
            }
        },
        render() {
            const slot = this.$slots.default;
            const vnode = getFirstComponentChild(slot);
            const componentOptions = vnode && vnode.componentOptions;
            if (componentOptions) {
                vnode.key = vnode.key || (vnode.isComment ? 'comment' : vnode.tag);
                // prevent vue-router reuse component
                const key = getKey(this.$route, keyName);
                if (vnode.key.indexOf(key) === -1) {
                    vnode.key = `__navigation-${key}-${vnode.key}`;
                }
                
                const name = key.split('?')[0]
                const index = this.keys.findIndex(item => item.split('?')[0] === name)
                if(this.tabbars.includes(name) && index > -1) {
                    const oldKey = this.keys[index]
                    // debugger
                    updateTabbarCache(this.routes, this.cache, this.keys, key, oldKey, vnode)
                }

                if (this.cache[key]) {
                    console.log(1);
                    if (vnode.key === this.cache[key].key) {
                        // restore vnode from cache
                        vnode.componentInstance = this.cache[key].componentInstance;
                    } else {
                        // replace vnode to cache
                        this.cache[key].componentInstance.$destroy();
                        this.cache[key] = vnode;
                    }
                } else {
                    console.log(2);
                    if (this.max && this.keys.length >= this.max) {
                        pruneCacheEntry(this.cache, this.keys, this.tabbars);
                    }
                    // cache new vnode
                    this.cache[key] = vnode;
                    this.keys.push(key);
                }
                console.log('cache: ', this.cache);
                console.log('keys: ', this.keys);
                vnode.data.keepAlive = true;
            }
            return vnode || (slot && slot[0]);
        }
    };
};
