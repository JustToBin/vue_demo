<template>
  <div class="cust-table-root" v-loading="loading">
    <div class="title-content">{{title}}</div>
    <div class="something-container">
      <slot></slot>
    </div>
    <el-table
      :data="data.data"
      stripe
      class="cust-table-table">
      <template v-for="(colItem, key) in cols">
        <template v-if="colItem.type === 'expand'">
          <el-table-column type="expand" :key="colItem.type">
            <template slot-scope="props1">
              <el-form label-position="left" inline class="inner-table-expand">
                <el-form-item :label="item1.label" v-for="(item1, key1) in colItem.info" :key="key1">
                  <span>{{ props1.row[key][key1] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.type === 'operator'">
          <el-table-column :key="key"
            :label="colItem.label"
            :width="colItem.width"
            :fixed="colItem.fixed"
            align="center">
            <template slot-scope="scope">
              <template v-for="(btnItem, index) in colItem.btns">
                <cust-pic-view :key="index" 
                  v-if="btnItem.type === 'file'"
                  :has-file="btnItem.hasFile(scope.row)"
                  :file-param="btnItem.fileParam(scope.row)">
                </cust-pic-view>
                <!-- <cust-pic-list-view :key="index" 
                  v-else-if="btnItem.type === 'file_list'"
                  :file-list="btnItem.fileList(scope.row)">
                </cust-pic-list-view> -->
                <el-button v-else size="mini" :key="index"
                  v-show="!btnItem.isShow || (btnItem.isShow && btnItem.isShow(scope.row))"
                  :type="btnItem.type"
                  @click="btnItem.onClick(scope.row)">
                  {{btnItem.label}}
                </el-button>
              </template>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.childs">
          <el-table-column :label="colItem.label" :key="key">
            <el-table-column v-for="(colItem1, key1) in colItem.childs"
              :key="key1"
              :prop="key1"
              :label="colItem1.label"
              :width="colItem1.width"
              align="center"
            ></el-table-column>
          </el-table-column>
        </template>
        <template v-else-if="colItem.hoverLabel">
          <el-table-column :key="key"
            :prop="key"
            :label="colItem.label"
            :width="colItem.width"
            align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" :key="key" :content="colItem.hoverLabel" placement="top-start">
                <span>{{scope.row[key]}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :key="key"
            :prop="key"
            :label="colItem.label"
            :width="colItem.width"
            align="center">
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div class="pagger-container">
      <div class="pagger-content">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="data.pageInfo.curPage"
          :total="data.pageInfo.totalNum"
          :page-size="data.pageInfo.perPage"
          @current-change="handlePageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: () => ""
    },
    data: {
      default: () => ({
        pageInfo: {
          totalNum: 1,
          curPage: 1,
          perPage: window.PAGE_SIZE
        },
        data: []
      })
    },
    cols: {
      default: () => {}
    }
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
    // window.vue.$on("table-data-load-begin", (id) => {
    //   if (this.id === id) {
    //     this.loading = true;
    //   }
    // });
    // window.vue.$on("table-data-load-end", (id) => {
    //   if (this.id === id) {
    //     this.loading = false;
    //   }
    // });
  },
  methods: {
    handlePageChange(currentPage) {
      this.$emit("current-change", currentPage);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/definitions.less";
.cust-table-root {
  border: 1px solid #dee5d7;
  border-radius: 5px;
  overflow: hidden;
  .title-content {
    background-color: #f8f8f8;
    font-size: 14px;
    color: #666;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }
  .something-container {
    min-height: 46px;
    line-height: 46px;
    background-color: @white;
    border: 1px solid #dee5d7;
    border-left: 0;
    border-right: 0;
    padding: 0 10px;
  }
  .cust-table-table {
    width: 100%
  }
  .pagger-container {
    height: 42px;
    background-color: @white;
    text-align: right;
    .pagger-content {
      margin-top: 5px;
      display: inline-block;
      text-align: center;
    }
  }
}
</style>


