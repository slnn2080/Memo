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
            <el-col :span="12" v-for="(i, k) of item.options" :key="k">
              <div>
                <el-form-item v-if="i.flag == 'code'">
                  <div>{{ i.subTitle }}：</div>
                  <el-input
                      placeholder="内容を入力してください。"
                      v-model="registerForm[i.prop]"
                      @change="handleZipcode"
                  ></el-input>
                </el-form-item>
                <el-form-item v-else>
                  <div>{{ i.subTitle }}：</div>
                  <el-input
                      placeholder="内容を入力してください。"
                      v-model="registerForm[i.prop]"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <template v-if="item.children">
            <new-register-test :registerData="item.children" :hide_save="true" :hide_reading="true"></new-register-test>
          </template>

          <el-form-item class="collapse-btn-group" v-if="!hide_reading">
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
    <el-dialog
        title="ファイル名："
        :visible.sync="saveDialogVisible"
        width="50%"
    >
      <span>ファイルの名前をつけてください。</span><br><br>
      <el-input placeholder="ファイル名前" v-model="searchFileName"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="saveDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSaveInfo">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import xlsx from "xlsx";

import {
  Form,
  FormItem,
  Input,
  Button,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Dialog,
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);

const url = process.env.apiUrl;
export default {
  name: "NewRegisterTest",
  props: {
    hide_reading: {
      type: Boolean,
      default: false
    },
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
    arr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      saveDialogVisible: false,
      searchFileName: "",
      collapseActiveName: "",
      collapseSubActiveName: "",
      registerForm: {},
    };
  },
  methods: {
    async handleZipcode() {
      let {data: res} = await this.$axios({
        url: "https://zipcloud.ibsnet.co.jp/api/search",
        method: "get",
        params: {
          zipcode: this.registerForm.zipcode
        }
      })
      console.log(res.results[0])
    },
    handleSaveInfo() {
      // let arr = this.testArr.map((item) => {
      //   return {
      //     郵便番号: item.zip,
      //     住所: item.address,
      //   };
      // });
      // let sheet = xlsx.utils.json_to_sheet(arr);
      // let book = xlsx.utils.book_new();
      // xlsx.utils.book_append_sheet(book, sheet, "sheet1");
      // xlsx.writeFile(book, this.userFileName);
      //
      // this.saveDialogVisible = false
    },
    saveUserInfo() {
      this.saveDialogVisible = true
    },
    handleClose() {
      this.collapseActiveName = "";
    },
  }
};
</script>

<style scoped>
.collapse-wrap {
  padding: 24px;
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
