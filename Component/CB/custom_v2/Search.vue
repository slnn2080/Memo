<template>
  <div class="search-wrap">
    <el-form ref="searchFormRef" :model="searchForm" class="search-form">
      <el-row :gutter="24">
        <el-col :span="searchColumn" v-for="(item, index) of searchData" :key="index">
          <div>
            <el-form-item>
              <div>{{ item.title }}：</div>
              <el-input
                size="small"
                v-if="item.type == 'input'"
                placeholder="入力してください"
                v-model="searchForm[item.prop]"
              ></el-input>
              <el-select
                size="small"
                style="width: 100%"
                v-else-if="item.type == 'select'"
                placeholder="選択してください"
                v-model="searchForm[item.prop]"
              >
                <el-option
                  v-for="(i, key) of item.option"
                  :key="key"
                  :label="i.title"
                  :value="i.value"
                ></el-option>
              </el-select>
              <el-date-picker
                style="width: 100%"
                v-model="searchForm[item.prop]"
                type="daterange"
                range-separator="~"
                start-placeholder="Start"
                end-placeholder="End"
                size="small"
                v-else-if="item.type == 'date'"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="btn_type_read">
          <div class="search-wrap">
            <el-button type="primary" plain icon="el-icon-arrow-down" size="small"
            >さらに読み込み</el-button
            >
            <el-button type="primary" plain icon="el-icon-arrow-up" size="small"
            >閉じる</el-button
            >
          </div>
        </el-col>
        <el-col :span="24" v-else-if="btn_type_search">
          <div class="search-wrap">
            <el-button type="primary" size="small"
            >検索</el-button
            >
          </div>
        </el-col>
        <el-col :span="24" v-else-if="btn_type_reset">
          <div class="search-wrap">
            <el-button type="danger" size="small"
            >リセット</el-button
            >
            <el-button type="primary" size="small"
            >検索</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";

import {
  Form,
  FormItem,
  Input,
  Button,
  Row,
  Col,
  Select,
  Option,
  DatePicker,
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
export default {
  name: "Search",
  props: {
    btn_type_read: {
      type: Boolean,
      default:false
    },
    btn_type_search: {
      type: Boolean,
      default:false
    },
    btn_type_reset: {
      type: Boolean,
      default:false
    },
    searchColumn: {
      type: Number,
      default: 8
    },
    hide_search_btn: {
      type: Boolean,
      default: false
    },
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      searchForm: {},
    };
  },
};
</script>

<style scoped lang="scss">
.search-wrap {
  padding: 10px 24px;
  margin: 24px 0px;
  display: flex;
  justify-content: center;

  .search-form {
    width: 100%;
  }
}

</style>
