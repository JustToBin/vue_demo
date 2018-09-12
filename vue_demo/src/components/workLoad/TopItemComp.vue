<style lang="less" scoped>
@import "~@/styles/definitions.less";
.top-item-comp-container {
  height: 50px;
  border-bottom: 1px solid @c-block-border;
}
</style>


<template>
  <div class="top-item-comp-container">
    <span>{{index}}</span>
    <span>{{name}}</span>
    <span>{{total}}</span>
    <span>{{left}}</span>
    <span>{{right}}</span>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      default: 0
    },
    name: {
      default: ""
    },
    total: {
      default: 0
    },
    left: {
      default: 0
    },
    right: {
      default: 0
    }
  }
};
</script>

