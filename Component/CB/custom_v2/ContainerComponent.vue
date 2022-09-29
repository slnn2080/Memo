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
                      @change="((v) => {headerSelectChange(v, item)})"
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
          <div v-if="!hide_pagination">
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
    hide_pagination: {
      type: Boolean,
      default: true
    },
    total_data: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
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
      pagination: {
        currentPage: 1,
        perPage: 5,
      },

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
    };
  },
  methods: {
    handleTableData(data) {
      this.tableData = data;
    },
    headerSelectChange(v, item) {
      let keysArr = Object.keys(this.headerSelect)
      if(keysArr.length == this.header_selector_data.length) {
        this.$emit("categoryChange", this.headerSelect)
      }
    }
  },
  beforeDestroy() {
    this.$off("categoryChange")
  },
  created() {
    console.log(this.total_data)
  }
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
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
}

.loading-icon {
  margin-right: 8px;
}
</style>
