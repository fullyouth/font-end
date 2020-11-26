(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function patch(oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      const parentElm = oldElm.parentNode;
    }
  }

  function lifecycleMixin(Vue) {
    // vnode => dom
    Vue.prototype._update = function (vnode) {
      const vm = this;
      patch(vm.$options.el);
    };
  }
  function mountComponent(vm, el) {
    // render函数 => vnode
    vm._update(vm._render());
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      el = document.querySelector(el);
      const vm = this;
      const options = vm.$options; // render规则

      if (!options.render) ;

      mountComponent(vm);
    };
  }

  function createElement(vm, tag, data = {}, ...children) {
    return vnode(vm, tag, data, data.key, children, undefined);
  }
  function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text) {
    return {
      vm,
      tag,
      children,
      data,
      key,
      text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function (...args) {
      // 创建元素的虚拟节点
      return createElement(this, ...args);
    };

    Vue.prototype._v = function (text) {
      // 创建文本的虚拟节点
      return createTextVnode(this, text);
    }; // 生成vnode


    Vue.prototype._render = function () {
      const vm = this;
      const render = vm.$options.render;
      let vnode = render.call(vm);
      return vnode;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
