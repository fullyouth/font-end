import { createElement, createTextVnode } from './vdom/index';

export function renderMixin (Vue) {
  Vue.prototype._c = function(...args) { // 创建元素的虚拟节点
    return createElement(this,...args);
  }
  Vue.prototype._v = function(text) { // 创建文本的虚拟节点
    return createTextVnode(this,text);
  }
  // 生成vnode
  Vue.prototype._render = function() {
    const vm = this;
    const render = vm.$options.render;

    let vnode = render.call(vm);
    return vnode;
  }
}