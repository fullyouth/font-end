import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from './lifecycle'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(Vue)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    const vm = this
    const options = vm.$options
    vm.$options.el = el

    if (!options.render) {
      let template = options.render
      if(!template && el){
        template = el.outerHTML; 
      }
      const render = compileToFunctions(template)
      options.render = render
    }
    mountComponent(vm);// 组件挂载
  }
}