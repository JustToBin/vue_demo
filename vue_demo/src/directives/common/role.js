export default {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function (el, binding) {
    const roleCode = binding.value;
    window.$logger.log("角色", roleCode.split(","));
  }
};
