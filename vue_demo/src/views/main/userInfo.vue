<template>
  <div class="user-info-page-root">
    <div class="page-title">
      个人信息
    </div>
    <div class="info-panel">
      <el-row class="user-info-row">
        <el-col :span="4">账号：</el-col>
        <el-col :span="20">{{userInfo.account}}</el-col>
      </el-row>
      <el-row class="user-info-row">
        <el-col :span="4">用户名：</el-col>
        <el-col :span="20">{{userInfo.name}}</el-col>
      </el-row>
      <el-row class="user-info-row">
        <el-col :span="4">邮箱：</el-col>
        <el-col :span="20">{{userInfo.email}}</el-col>
      </el-row>
      <el-row class="user-info-row">
        <el-col :span="4">所属公司：</el-col>
        <el-col :span="20">{{userInfo.company}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; 
export default {
  data() {
    return {
    };
  },
  created() {
  },
  beforeDestroy() {
  },
  computed: {
    ...mapGetters("user", [
      "userInfo"
    ])
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/definitions.less";
.user-info-page-root {
  padding: 30px 20px;
  .page-title {
    font-size: 20px;
    color: @fc-page-title;
    margin-bottom: 20px;
  }
  .info-panel {
    width: 100%;
    background-color: @white;
    border: 1px solid @c-block-border;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .user-info-row {
    padding: 10px 0;
  }
}
</style>
