<template>
  <el-upload
    class="import-excel"
    action="#"
    :limit="1"
    :show-file-list="false"
    :on-change="handleChange"
    :http-request="uploadFile"
    :accept="uploadAccept"
    :auto-upload="false"
  >
    <el-button size="small" :type="importBtn" icon="el-icon-download"
      >Excelインポート</el-button
    >
  </el-upload>
</template>

<script>
import Vue from "vue";
import { Upload, Button } from "element-ui";
import xlsx from "xlsx";

Vue.use(Upload);
Vue.use(Button);

export default {
  name: "ImportExcelBtn",
  props: {
    importBtn: {
      type: String,
      default: "primary",
    },
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      uploadAccept: ".xls,.xlsx",
    };
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
      console.log(this.field);
      data.forEach((item) => {
        let o = {};
        for (let key in this.field) {
          if (!this.field.hasOwnProperty(key)) break;
          let v = this.field[key],
            text = v.text,
            type = v.type;

          v = item[text] || "";
          type == "string" ? (v = String(v)) : null;
          o[key] = v;
        }
        arr.push(o);
      });
      this.$emit("sendTableData", arr);
    },
  },
};
</script>

<style scoped>
.import-excel {
  margin-right: 12px;
}
</style>
