<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0"></h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div>
        <Card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <!-- header start -->
          <template slot="header">
            <div class="job-header">
              <div class="header-select">
                <h3 class="mb-0">{{ page_name }}</h3>

                <!-- header select機能 -->
                <template v-if="!hide_header_search">
                  <div
                    v-for="(item, index) of header_selector_data"
                    :key="index"
                    class="header-select-wrap"
                  >
                    <span>{{ item.title }}：</span>
                    <el-select
                      v-model="headerSelect[item.prop]"
                      placeholder="Select"
                      size="small"
                    >
                      <el-option
                        v-for="(i, index) of item.options"
                        :key="index"
                        :value="i.value"
                        :label="i.label"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
              </div>

              <!-- header btn area -->
              <div class="header-btn-group">
                <template v-if="!hide_import">
                  <ImportExcelBtn
                    :field="sheetField"
                    @sendTableData="handleTableData"
                    :importBtn="importBtn"
                  ></ImportExcelBtn>
                </template>
                <template v-if="!hide_search">
                  <el-button type="primary" size="small">検索</el-button>
                </template>
                <template v-if="!hide_mail_label">
                  <el-button type="primary" size="small">編集</el-button>
                  <el-button type="primary" size="small">メール作成</el-button>
                  <el-button type="primary" size="small" v-print="'#print-area'">ラベル印刷</el-button>
                </template>
                <template v-if="!hide_export">
                  <el-button type="primary" size="small" icon="el-icon-upload2"
                    >Excelエクスポート</el-button
                  >
                </template>
                <template v-if="!hide_save">
                  <el-button type="primary" size="small" icon="el-icon-check"
                    >保存</el-button
                  >
                </template>
              </div>
            </div>
          </template>
          <!-- header end -->

          <slot></slot>

          <!-- footer -->
          <div v-if="false">
            <div
              slot="footer"
              class="
                col-12
                d-flex
                justify-content-center justify-content-sm-between
                flex-wrap
              "
            >
              <div class="">
                <p class="card-category">
                  Showing Page {{ from + 1 }} to {{ to }} of
                  {{ total_data }} data entries

                  <span v-if="selectedRows.length">
                    &nbsp; &nbsp; {{ selectedRows.length }} rows selected
                  </span>
                </p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total_data"
              >
              </base-pagination>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination, Card, BaseButton } from "@/components/argon-core";
import ImportExcelBtn from "../../../components/layouts/custom/ImportExcelBtn"
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
const url = process.env.apiUrl;

export default {
  name: "ContainerComponent",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  props: {
    handlePrint: {
      type: Function
    },
    importBtn: {
      type: String,
    },
    header_selector_data: {
      type: Array,
      default() {
        return [];
      },
    },
    hide_header_search: {
      type: Boolean,
      default: true,
    },
    hide_import: {
      type: Boolean,
      default: true,
    },
    hide_search: {
      type: Boolean,
      default: true,
    },
    hide_mail_label: {
      type: Boolean,
      default: true,
    },
    hide_export: {
      type: Boolean,
      default: true,
    },
    hide_save: {
      type: Boolean,
      default: true,
    },
    page_name: {
      type: String,
      default: "",
    },
  },
  components: {
    BasePagination,
    Card,
    BaseButton,
    RouteBreadCrumb,
    ImportExcelBtn,
  },
  data() {
    return {
      headerSelect: {},
      // テーブルのフィールドのデータの形
      sheetField: {
        username: {
          text: "会員名",
          type: "string",
        },
        entrust: {
          text: "依頼情況",
          type: "string",
        },
        date: {
          text: "変更日",
          type: "string",
        },
        point: {
          text: "変更点",
          type: "string",
        },
      },
      // テーブルのフィールドのコラムの形
      tableColumn: [
        {
          prop: "username",
          label: "会員名",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
        {
          prop: "entrust",
          label: "依頼情況",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "date",
          label: "変更日",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "point",
          label: "変更点",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
      ],
      // テーブルのデータ
      tableData: [],
      // 新規登録データ
      registerData: [
        {
          title: "基本情報",
          flag: "1",
          content: [
            {
              subTitle: "登録番号",
              type: "input",
              prop: "usernameNo",
            },
            {
              subTitle: "氏名",
              type: "input",
              prop: "username",
            },
            {
              subTitle: "フリガナ",
              type: "input",
              prop: "usernameKana",
            },
            {
              subTitle: "生年月日",
              type: "input",
              prop: "birthday",
            },
            {
              subTitle: "性別",
              type: "input",
              prop: "gender",
            },
          ],
        },
        {
          title: "登録情報",
          flag: "2",
          content: [
            {
              subTitle: "支部",
              type: "input",
              prop: "shibu",
            },
            {
              subTitle: "種別",
              type: "input",
              prop: "syubetu",
            },
            {
              subTitle: "会員番号",
              type: "input",
              prop: "kaiinno",
            },
            {
              subTitle: "整理番号",
              type: "input",
              prop: "seirino",
            },
            {
              subTitle: "コード",
              type: "input",
              prop: "code",
            },
            {
              subTitle: "登録年月日",
              type: "input",
              prop: "registerDate",
            },
            {
              subTitle: "入会年月日",
              type: "input",
              prop: "nyukaiDate",
            },
            {
              subTitle: "退会年月日",
              type: "input",
              prop: "taikaiDate",
            },
            {
              subTitle: "変更年月日",
              type: "input",
              prop: "henkouDate",
            },
          ],
        },
        {
          title: "事務所等情報",
          flag: "3",
          content: [
            {
              subTitle: "名称",
              type: "input",
              prop: "companyName",
            },
            {
              subTitle: "所在地",
              type: "input",
              prop: "address",
            },
            {
              subTitle: "電話",
              type: "input",
              prop: "tel",
            },
            {
              subTitle: "FAX",
              type: "input",
              prop: "fax",
            },
          ],
        },
      ],
      // 検索データ
      searchData: [
        {
          title: "会員名漢字",
          type: "input",
          flag: "1",
          prop: "usernameKanji",
        },
        {
          title: "会員名かな",
          type: "input",
          flag: "2",
          prop: "usernameKana",
        },
        {
          title: "登録番号",
          type: "input",
          flag: "3",
          prop: "registerNo",
        },
        {
          title: "支部コード",
          type: "input",
          flag: "4",
          prop: "shibuCode",
        },
        {
          title: "電話番号",
          type: "input",
          flag: "5",
          prop: "telNo",
        },
        {
          title: "FAX",
          type: "input",
          flag: "6",
          prop: "fax",
        },
        {
          title: "メールアドレス",
          type: "input",
          flag: "7",
          prop: "mail",
        },
        {
          title: "日付",
          type: "date",
          flag: "8",
          prop: "date",
        },
        {
          title: "会員種別（１）",
          type: "select",
          flag: "9",
          prop: "category1",
          option: [
            {
              title: "全会員",
              value: "1",
            },
            {
              title: "開業（個人）",
              value: "2",
            },
            {
              title: "開業（法人）",
              value: "3",
            },
            {
              title: "非開業（勤務）",
              value: "4",
            },
            {
              title: "非開業（その他）",
              value: "5",
            },
            {
              title: "退会",
              value: "6",
            },
            {
              title: "死亡退会",
              value: "7",
            },
            {
              title: "登録抹消",
              value: "8",
            },
          ],
        },
      ],
    };
  },
  updated() {
    // console.log(this.sheetField);
  },
  watch: {},
  methods: {
    test() {
      console.log(1)
    },
    handleTableData(data) {
      this.tableData = data;
    },
  },
};
</script>
<style scoped>
.filter_feature {
  margin: 0px 0px 24px 24px;
}
img {
  object-fit: contain;
}
.no-border-card .card-footer {
  border-top: 0;
}

.job-header {
  display: flex;
  justify-content: space-between;
  padding-right: 36px;
}
.btn_container {
  height: 100px;
}

.header-select {
  display: flex;
  align-items: center;
}

.header-select span:nth-of-type(2) {
  margin-left: 15px;
}

.header-btn-group {
  display: flex;
  align-items: center;
}

/deep/ .el-select .el-input .el-input__inner {
  height: 32px;
}

.header-select h3 {
  margin-right: 50px;
}

.header-select-wrap span {
  margin-left: 12px;
}

.search-wrap {
  padding: 0 24px;
  margin-bottom: 24px;
  width: 100%;
}

.search-wrap .el-select {
  width: 100%;
}

.search-btn-group {
  padding: 0 50px 0 24px;
  margin: 24px 0;
  text-align: right;
}

.upload-wrap {
  margin: 24px 24px 48px;
}
.upload-btn {
  display: flex;
  justify-content: space-between;
}

.upload-con {
  text-align: center;
  padding: 24px;
}

.upload-wrap /deep/ .el-upload-dragger {
  width: 100%;
  padding: 24px;
}
</style>
