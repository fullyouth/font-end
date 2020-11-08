组件  
生命周期文件混入_update  暴露一个方法mountComponent

patch（打补丁） 将vnode 挂载在vnode.el上
new => _init => mountComponent => new Watcher => vm._update(vm._render()) => patch

模板 => 虚拟节点 => DOM
template/外部模板 => render => vnode => patch => dom
render => vnode => => patch => dom
取template的规则：1.render 2. template 3. 外部模板


