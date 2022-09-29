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

          <template v-if="item.children">
            <new-register :registerData="item.children" :hide_save="true" :hide_reading="true"></new-register>
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
    <div class="zip-code-search">
      <el-row :gutter="24">
        <el-col :span="12">
          <div>
            <span>郵便番号：</span>
            <el-input v-model="testSearch.zip" @blur="handleSearchAddress"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>住所：</span>
            <el-input v-model="testSearch.address"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
        title="FileName："
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
  name: "NewRegister",
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
      testArr: [],
      testSearch: {
        zip: "",
        address: ""
      },
      collapseActiveName: "",
      collapseSubActiveName: "",
      collapseLabelOne: "",
      collapseLabelTwo: "",
      registerForm: {},
      zipCode: [
        {
          "prefecture_jis_code":"13",
          "city_jis_code":"13119",
          "zip_code":"1740062",
          "prefecture_name_kana":"ﾄｳｷｮｳﾄ",
          "city_name_kana":"ｲﾀﾊﾞｼｸ",
          "town_name_kana":"ﾌｼﾞﾐﾁｮｳ",
          "prefecture_name":"東京都",
          "city_name":"板橋区",
          "town_name":"富士見町"
        },
        {"prefecture_jis_code":"13",
          "city_jis_code":"13119",
          "zip_code":"1740063",
          "prefecture_name_kana":"ﾄｳｷｮｳﾄ",
          "city_name_kana":"ｲﾀﾊﾞｼｸ",
          "town_name_kana":"ﾏｴﾉﾁｮｳ",
          "prefecture_name":"東京都",
          "city_name":"板橋区",
          "town_name":"前野町"
        }
      ],
    };
  },
  computed: {
    userFileName() {
      if(this.searchFileName) {
        return `${this.searchFileName}.xls`
      } else {
        return `user${+new Date()}.xls`
      }
    }
  },
  methods: {
    handleSaveInfo() {
      let arr = this.testArr.map((item) => {
        return {
          郵便番号: item.zip,
          住所: item.address,
        };
      });
      let sheet = xlsx.utils.json_to_sheet(arr);
      let book = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, sheet, "sheet1");
      xlsx.writeFile(book, this.userFileName);

      this.saveDialogVisible = false
    },
    saveUserInfo() {
      this.saveDialogVisible = true
    },
    handleClose() {
      this.collapseActiveName = "";
    },
    handleSearchAddress(e) {
      console.log(e.target.value)
      let value = e.target.value

      if (!value) return
      let res = this.zipCode.find(item => {
        return item["zip_code"] == value
      })

      let addressStr = res ? `${res["prefecture_name"]} ${res["city_name"]} ${res["town_name"]}` : ""
      this.testSearch.address = addressStr
      this.testArr.push(this.testSearch)
      console.log(this.testArr)
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
