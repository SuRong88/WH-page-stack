import Routes from './routes'
import scrollTopMap, {setScrollTop, getScrollTop} from './scrollTopMap'
import Navigator from './navigator'
import NavComponent from './components/Navigation'
import { genKey, getKey, isObjEqual } from './utils'

export default {
  install: (Vue, { router, store, moduleName = 'navigation', keyName = 'VNK' } = {}) => {
    if (!router) {
      console.error('vue-navigation need options: router')
      return
    }

    const bus = new Vue()
    const navigator = Navigator(bus, store, moduleName, keyName)

    // hack vue-router replace for replaceFlag
    const routerReplace = router.replace.bind(router)
    let replaceFlag = false
    router.replace = (location, onComplete, onAbort) => {
      replaceFlag = true
      routerReplace(location, onComplete, onAbort)
    }

    // init router`s keyName
    router.beforeEach((to, from, next) => {
      if (!to.query[keyName]) {
        const query = { ...to.query }
        // go to the same route will be set the same key
        // console.log(to.path === from.path, from.query[keyName]);
        if (to.path === from.path && isObjEqual(
          { ...to.query, [keyName]: null },
          { ...from.query, [keyName]: null },
        ) && from.query[keyName]) {
          query[keyName] = from.query[keyName]
        } else {
          query[keyName] = genKey()
        }
        next({ name: to.name, params: to.params, query, replace: replaceFlag || !from.query[keyName] })
      } else {
        if(from.query[keyName]) { // equal false when redirect from '/' 
          const toKey = getKey(to, keyName)
          const fromKey = getKey(from, keyName)
          const isBack = Routes.includes(toKey)
          console.log('isBack: ', isBack);
          if(!isBack || from.meta.isTabbar) {
            setScrollTop(fromKey, from.meta.isTabbar)
          }
        }
        next()
      }
    })

    // record router change
    router.afterEach((to, from) => {
      const toKey = getKey(to, keyName)
      getScrollTop(toKey, to.meta.isTabbar)

      navigator.record(to, from, replaceFlag)
      replaceFlag = false
    })

    Vue.component('navigation', NavComponent(keyName))

    Vue.navigation = Vue.prototype.$navigation = {
      on: (event, callback) => {
        bus.$on(event, callback)
      },
      once: (event, callback) => {
        bus.$once(event, callback)
      },
      off: (event, callback) => {
        bus.$off(event, callback)
      },
      getRoutes: () => Routes.slice(),
      cleanRoutes: () => navigator.reset()
    }
  }
}
