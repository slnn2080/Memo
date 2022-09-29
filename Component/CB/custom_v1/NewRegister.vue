<template>
  <div class="collapse-wrap">
    <el-form ref="registerFormRef" :model="registerForm">
      <el-collapse :accordion="true" v-model="collapseActiveName">
        <el-collapse-item
          v-for="(item, index) of registerData"
          :name="item.flag"
          :key="index"
        >
          <template slot="title">
            <span class="registerTitle">{{ item.title }}</span>
          </template>
          <el-row :gutter="24">
            <el-col :span="12" v-for="(i, k) of item.content" :key="k">
              <div>
                <el-form-item>
                  <div>{{ i.subTitle }}：</div>
                  <el-input
                    placeholder="内容を入力してください。"
                    v-model="registerForm[i.prop]"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item class="collapse-btn-group">
            <el-button
              type="primary"
              plain
              icon="el-icon-arrow-down"
              size="small"
              >さらに読み込み</el-button
            >
            <el-button type="primary" plain icon="el-icon-arrow-up" size="small"
              >閉じる</el-button
            >
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-form-item class="collapse-save-wrap" v-if="!hide_save">
        <el-button type="primary" @click="saveUserInfo" size="small"
          >保存</el-button
        >
      </el-form-item>
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
  Collapse,
  CollapseItem,
  Row,
  Col,
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);

const url = process.env.apiUrl;
export default {
  name: "NewRegister",
  props: {
    hide_save: {
      type: Boolean,
      default: false
    },
    registerData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      collapseActiveName: "",
      collapseSubActiveName: "",
      collapseLabelOne: "",
      collapseLabelTwo: "",
      registerForm: {},
    };
  },
  methods: {
    saveUserInfo() {
      console.log(this.registerForm);
    },
    handleClose() {
      this.collapseActiveName = "";
    },
  },
};
</script>

<style scoped>
.collapse-wrap {
  padding: 24px;
  margin: 24px 0px;
}

.collapse-btn-group {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.collapse-save-wrap {
  margin-top: 24px;
  text-align: center;
}

.collapse-wrap .registerTitle {
  font-size: 14px;
  font-weight: 600;
}

.collapse-wrap .registerSubTitle {
  font-size: 14px;
  font-weight: 600;
  padding-left: 48px;
}

.collapse-wrap .subContent {
  padding-left: 48px;
}
</style>
