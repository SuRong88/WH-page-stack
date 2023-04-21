const applyPermissionBtn = window.$config.applyPermissionBtn;
export default Vue => {
    Vue.directive('permission', {
        inserted: function(el, binding, vnode) {
            if (!applyPermissionBtn) return;
            const permissionBtns = window.vm.$store.state.permissionBtns;
            const btnName = binding.value;
            const permission = permissionBtns.includes(btnName);
            if (!permission) {
                console.log('该用户 该按钮:' + btnName + ' 无权限');
                el.parentNode && el.parentNode.removeChild(el);
            } else {
                console.log('该用户 该按钮: ' + btnName + ' 有权限');
            }
        }
    });
};
