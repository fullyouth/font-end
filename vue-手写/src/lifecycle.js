import { patch } from './vdom/patch'

export function lifecycleMixin(Vue) {
  // vnode => dom
  Vue.prototype._update = function(vnode) {
    const vm = this;
    patch(vm.$options.el, vnode)
  }
}

export function mountComponent(vm, el) {
  // render函数 => vnode
  vm._update(vm._render())
}