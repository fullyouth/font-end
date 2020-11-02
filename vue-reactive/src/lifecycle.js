import Watcher from "./observer/watcher"

export function mountComponent() {
  let updateComponent = () => {
    vm._update(vm._render()); // 虚拟节点
  }
  new Watcher(vm, updateComponent, () => { }, true);
}