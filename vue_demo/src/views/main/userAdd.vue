<template>
  <div class="user-add-page-root">
    <div class="page-title">
      添加{{userMap[$route.params.type]}}
    </div>
    <div class="edit-panel">
      <el-form label-width="80px" ref="userEditForm" :model="formModel" :rules="formRule">
        <el-form-item label="账号" prop="account">
          <el-input style="width: 300px;" v-model="formModel.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input style="width: 300px;" v-model="formModel.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input style="width: 300px;" v-model="formModel.email"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" prop="companyId">
          <el-select style="width: 300px;" v-model="formModel.companyId" placeholder="请选择">
            <el-option
              v-for="item in companyList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left; margin-right: 20px;">{{ item.label }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.personCount }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="text-align: right;">
            <el-button size="middle" @click="handleCancle">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; 
export default {
  data() {
    return {
      userMap: {
        approver: "审批人员",
        finance: "财务用户"
      },
      formModel: {
        account: "",
        name: "",
        email: "",
        companyId: ""
      },
      formRule: {
        account: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { validator: (rule, value, callback, source, options) => {
            let errors = [];
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
              errors.push(new Error("请填写正确邮箱地址"));
            }
            callback(errors);
          }, trigger: 'change' }
        ],
        companyId: [
          { required: true, message: '选择所属公司', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
  },
  beforeDestroy() {
    this.account = "";
    this.name = "";
    this.email = "";
    this.companyId = "";
  },
  computed: {
    ...mapGetters("user", [
      "companyList"
    ])
  },
  methods: {
    ...mapActions("user", [
      "addUser"
    ]),
    handleCancle() {
      this.$router.back();
    },
    handleSubmit() {
      const type = this.$route.params.type;
      this.$refs["userEditForm"].validate((valid) => {
        if (valid) {
          this.addUser({
            type: type,
            account: this.formModel.account, 
            name: this.formModel.name, 
            email: this.formModel.email, 
            companyId: this.formModel.companyId
          }).then((data) => {
            if (data.success) {
              this.$message.success("添加成功");
              this.$router.back();
            } else {
              this.$message.error(data.message);
              this.$router.back();
            }
          }).catch((e) => {
            this.$message.error(e.message);
          });
        } else {
          this.$message.error("请先完成表单");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/definitions.less";
.user-add-page-root {
  padding: 30px 20px;
  .page-title {
    font-size: 20px;
    color: @fc-page-title;
    margin-bottom: 20px;
  }
  .edit-panel {
    width: 100%;
    background-color: @white;
    border: 1px solid @c-block-border;
    padding: 20px;
    padding-bottom: 0px;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
</style>
