import { $locals } from "@/utils";

export default {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function (el, binding) {
    const authCode = binding.value;
    const authArr = $locals.get("USER_AUTHS", "").split(",");
    if (authArr.indexOf(authCode) === -1) {
      el.style.display = "none";
    }
  }
};
