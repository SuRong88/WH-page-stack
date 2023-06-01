import Routes from '../routes';
import { getKey, matches, remove, getFirstComponentChild } from '../utils';

const patternTypes = [String, RegExp, Array];

const pruneCacheEntry = (cache, keys) => {
    const key = keys[0];
    const vnode = cache[key];
    vnode && vnode.componentInstance.$destroy();
    delete cache[key];
    remove(keys, key);
    //         remove(keys, key);
    // for (let i = 0; i < keys.length; i++) {
    //     const key = keys[i];
    //     const name = key.split('?')[0]
    //     if (!tabbars.includes(name)) {
    //         const vnode = cache[key];
    //         vnode && vnode.componentInstance.$destroy();
    //         delete cache[key];

    //         remove(keys, key);
    //         console.log('pruneCacheEntry', name, key);
    //         break;
    //     }
    // }
};

export default keyName => {
    return {
        name: 'navigation',
        abstract: true,
        props: {
            max: [String, Number]
        },
        data: () => ({
            routes: Routes
        }),
        // watch: {
            // routes(val) {
                // console.log('watch 1', val);
                // for (const key in this.cache) {
                //     if (!matches(val, key)) {
                //         const vnode = this.cache[key];
                //         vnode && vnode.componentInstance.$destroy();
                //         delete this.cache[key];

                //         remove(this.keys, key);
                //     }
                // }
            // }
        // },
        created() {
            this.cache = {};
            this.keys = [];
            
            this.$watch('routes', function (val) {
                console.log('watch 2', val);
                for (const key in this.cache) {
                    if (!matches(val, key)) {
                        const vnode = this.cache[key];
                        vnode && vnode.componentInstance.$destroy();
                        delete this.cache[key];

                        remove(this.keys, key);
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
                if (this.cache[key]) {
                    if (vnode.key === this.cache[key].key) {
                        // restore vnode from cache
                        vnode.componentInstance = this.cache[key].componentInstance;
                    } else {
                        // replace vnode to cache
                        this.cache[key].componentInstance.$destroy();
                        this.cache[key] = vnode;
                    }
                } else {
                    if (this.max && this.keys.length >= parseInt(this.max)) {
                        pruneCacheEntry(this.cache, this.keys);
                    }
                    // cache new vnode
                    this.cache[key] = vnode;
                    this.keys.push(key);
                }
                console.log('cache: ', this.cache);
                console.log('keys: ', this.keys);
                // console.log(6666666);
                vnode.data.keepAlive = true;
            }
            return vnode || (slot && slot[0]);
        }
    };
};
