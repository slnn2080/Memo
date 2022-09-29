<template>
  <Card class="upload-wrap">
    <div slot="header" class="upload-header-wrap">
      <span>ファイルをアップロード</span>
      <el-button
        ref="btnRef"
        type="success"
        class="upload-btn"
        @click="fileSelect"
        size="small"
        >ファイルを選択</el-button
      >
    </div>
    <el-upload
      ref="upload"
      drag
      class="upload-con"
      :auto-upload="true"
      :limit="1"
      :accept="uploadAccept"
      :http-request="uploadFile"
      :show-file-list="false"
      :on-change="handleChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        こちらにファイルをドラックするか、ファイルを選択ボタンからインポートしてください。
      </div>
    </el-upload>
  </Card>
</template>

<script>
import { Row, Col, Upload, Button } from "element-ui";
import { Card } from "@/components/argon-core";
import Vue from "vue";
import xlsx from "xlsx";

Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Button);

const url = process.env.apiUrl;
export default {
  name: "UploadComponent",
  data() {
    return {
      uploadAccept: ".xls,.xlsx",
      sheetField: {
        name: {
          text: "name",
          type: "string",
        },
        phone: {
          text: "phone",
          type: "string",
        },
      },
    };
  },
  components: {
    Card,
  },
  methods: {
    readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      });
    },
    async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      let data = await this.readFile(file);
      let workBook = xlsx.read(data, { type: "binary" });

      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(workSheet);

      let arr = [];
      data.forEach((item) => {
        let o = {};
        for (let key in this.sheetField) {
          if (!this.sheetField.hasOwnProperty(key)) break;
          let v = this.sheetField[key],
            text = v.text,
            type = v.type;

          v = item[text] || "";
          type == "string" ? (v = String(v)) : null;
          type == "number" ? (v = Number(v)) : null;

          o[key] = v;
        }
        arr.push(o);
      });

      // 这里可以将arr数据交给tableData
    },
    async uploadFile() {
      if (this.tableData.length <= 0) return alert("请您选选择文件哦");
    },

    fileSelect(e) {
      let inp = this.$refs.upload.$el.querySelector("input[type=file]");
      inp.click();
    },
  },
};
</script>

<style scoped>
.el-upload .upload-wrap {
  position: relative;
}

.upload-wrap {
  margin: 24px 24px;
  height: 320px;
}

.upload-header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-con {
  text-align: center;
  padding: 15px 0px;
}

.upload-wrap /deep/ .el-upload-dragger {
  width: 100%;
  padding: 24px;
}
</style>
