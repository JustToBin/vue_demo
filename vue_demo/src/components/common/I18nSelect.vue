
<template>
  <div>
    <el-select size="mini" v-model="value" placeholder="Language" @change="handleI18nChange">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
const files = [];
import { $locals } from "@/utils";

export default {
  data() {
    return {
      selectOptions: [],
      value: ""
    };
  },
  mounted() {
    let _this = this;
    files.keys().forEach(key => {
      if (key !== "./index.js") {
        const keysList = key.split("/");
        const resultKey = keysList[keysList.length - 1].replace(/(\.\/|\.js)/g, '');
        _this.selectOptions.push({
          value: resultKey,
          label: files(key).default.lang.name
        });
        return true;
      }
    });
    _this.value = _this.$i18n.locale;
  },
  methods: {
    handleI18nChange(val) {
      this.$i18n.locale = val;
      $locals.set("i18n", val);
    }
  }
};
</script>
