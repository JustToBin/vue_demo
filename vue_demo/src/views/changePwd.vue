<template>
  <div>
    <el-dialog
      :visible="true"
      :show-close="false"
      title="修改密码">
      <el-form
        label-width="80px"
        :rules="formRule"
        ref="changePwdForm"
        :model="formVal">
        <el-form-item v-if="$route.query.from !== 'inner'">
          <div>您需要修改密码后才能进入系统</div>
          <div>密码规则：8-20位，且必须包含1位字母、1位数字及1位特殊符号</div> 
        </el-form-item>
        <el-form-item v-else>
          <div>密码规则：8-20位，且必须包含1位字母、1位数字及1位特殊符号</div> 
        </el-form-item>
        <el-form-item prop="oldPwd" label="原始密码">
          <el-input v-model="formVal.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd" label="新密码">
          <el-input v-model="formVal.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd" label="确认密码">
          <el-input v-model="formVal.confirmPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="handleBack" v-if="$route.query.from === 'inner'">返回</el-button>
          <el-button @click="handleLogout" v-else>退出</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { $auth, $helper } from "@/utils";
export default {
  data() {
    return {
      formVal: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      formRule: {
        oldPwd: [
          { required: true, message: '请填写原始密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { validator: (rule, value, callback, source, options) => {
            let errors = [];
            const checkResult = $helper.checkPassword(value);
            if (!checkResult.ok) {
              errors.push(new Error(checkResult.msg));
            }
            callback(errors);
          }, trigger: 'change' }
        ],
        confirmPwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: (rule, value, callback, source, options) => {
            let errors = [];
            if (this.formVal.newPwd !== value) {
              errors.push(new Error("确认密码与新密码不一致"));
            }
            callback(errors);
          }, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "loginInfo"
    ])
  },
  created() {
    window.$logger.info("cdasddqwd", this.$route);
  },
  methods: {
    ...mapActions("auth", [
      "changePwd"
    ]),
    handleConfirm() {
      let _this = this;
      this.$refs.changePwdForm.validate((valid) => {
        if (valid) {
          _this.changePwd({
            oldPwd: _this.formVal.oldPwd,
            newPwd: _this.formVal.newPwd
          }).then((data) => {
            _this.$message.success(data.msg);
            $auth.logout();
          }).catch((e) => {
            _this.$message.error(e.message);
          });
        } else {
          _this.$message.error('请填写正确信息!');
        }
      });
    },
    handleBack() {
      this.$router.back();
    },
    handleLogout() {
      $auth.logout();
    }
  }
};
</script>

