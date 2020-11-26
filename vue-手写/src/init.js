import { initState } from './state';
import { mountComponent } from './lifecycle';

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options
    
    initState(vm)
    // ...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    el = document.querySelector(el);
    const vm = this;
    const options = vm.$options;
    // render规则
    if (!options.render) {

    }
    mountComponent(vm, el)
  }
}