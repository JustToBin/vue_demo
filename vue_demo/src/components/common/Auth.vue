<template>
  <span v-if="isShow">
    <slot></slot>
  </span>
</template>

<script>
import { $locals } from "@/utils";
export default {
  props: {
    hasAnyPermission: ""
  },
  data() {
    return {
      curPermit: ""
    };
  },
  created() {
    const initVal = $locals.get("user_auth");
    this.refreshAuth({
      newValue: initVal
    });
    window.vue.$on("storage-changed", (e) => {
      if (e.key === "user_auth") {
        this.refreshAuth(e);
      }
    });
  },
  methods: {
    refreshAuth(object) {
      this.curPermit = object.newValue;
    }
  },
  computed: {
    isShow() {
      const permitList = this.curPermit.split(",").map((val) => val.trim());
      const itemPermit = this.hasAnyPermission.split(",").map((val) => val.trim());
      for (const index in itemPermit) {
        if (permitList.indexOf(itemPermit[index]) !== -1) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

