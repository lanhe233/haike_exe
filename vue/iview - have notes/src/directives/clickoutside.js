export default {
    bind (el, binding, vnode) {
        function documentHandler (e) {
            // 判断点击元素是否被指令dom包含
            if (el.contains(e.target)) {
                return false;
            }
            // 执行函数
            if (binding.expression) {
                binding.value(e);
            }
        }
        // 将执行函数绑定到el对象上存起来
        el.__vueClickOutside__ = documentHandler;
        // 绑定点击事件
        document.addEventListener('click', documentHandler);
    },
    update () {

    },
    unbind (el, binding) {
        // 清除点击事件并删除el对象上存的执行函数
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};