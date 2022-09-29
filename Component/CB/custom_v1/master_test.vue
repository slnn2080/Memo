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
          <template slot="header">
            <div class="job-header">
              <div class="header-select">
                <h3 class="mb-0">{{ page_name }}</h3>

                <!-- header select -->
                <template v-if="false">
                  <span>役割：</span>
                  <el-select name="" placeholder="Select" size="small">
                    <el-option value="0">一般会員</el-option>
                  </el-select>
                  <span>会員：</span>
                  <el-select name="" placeholder="Select" size="small">
                    <el-option value="0">個人</el-option>
                  </el-select>
                </template>
              </div>
              <div>
                <el-button
                  v-if="hide_create"
                  type="success"
                  class="btn btn-primary"
                  @click="excelImport"
                  >Excelインポート</el-button
                >
              </div>
            </div>
          </template>

          <template v-if="true">
            <NewRegister></NewRegister>
          </template>

          <template v-if="true">
            <Search></Search>
          </template>

          <template v-if="true">
            <UploadComponent></UploadComponent>
          </template>

          <!-- 折り畳み -->
          <template v-if="false">
            <div class="collapse-warp">
              <el-collapse :accordion="true">
                <el-collapse-item name="1">
                  <template slot="title">
                    <span style="font-size: 16px; font-weight: 600"
                      >基本情報</span
                    >
                  </template>
                  <div class="collapse-con">
                    <label>
                      登録名：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      登録名かな：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      登録番号：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      支部コード：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                  </div>
                  <div class="collapse-btn-group">
                    <el-button
                      type="primary"
                      plain
                      icon="el-icon-arrow-down
"
                      >さらに読み込み</el-button
                    >
                    <el-button
                      type="primary"
                      plain
                      icon="el-icon-arrow-up
"
                      >閉じる</el-button
                    >
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                    <span style="font-size: 16px; font-weight: 600">自宅</span>
                  </template>
                  <div class="collapse-con">
                    <label>
                      登録名：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      登録名かな：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      登録番号：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                    <label>
                      支部コード：
                      <el-input placeholder="内容を入力してください"></el-input>
                    </label>
                  </div>
                  <div class="collapse-btn-group">
                    <el-button
                      type="primary"
                      plain
                      icon="el-icon-arrow-down
"
                      >さらに読み込み</el-button
                    >
                    <el-button
                      type="primary"
                      plain
                      icon="el-icon-arrow-up
"
                      >閉じる</el-button
                    >
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div class="collapse-save-warp">
                <el-button type="primary">保存</el-button>
              </div>
            </div>
          </template>

          <!-- 検索機能 -->
          <template v-if="false">
            <el-row class="search-wrap" :gutter="24">
              <el-col :span="6">
                <div>
                  <span>日付：</span>
                  <el-date-picker
                    style="width: 100%"
                    v-model="value"
                    type="daterange"
                    start-placeholder=""
                    end-placeholder=""
                    :default-time="['00:00:00', '23:59:59']"
                    size="small"
                  >
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>支部：</span>
                  <el-select name="" placeholder="Select" size="small">
                    <el-option value="0">select-item</el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>コード：</span>
                  <el-input
                    placeholder="内容を入力してください"
                    size="small"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>備考：</span>
                  <el-input
                    placeholder="内容を入力してください"
                    size="small"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row class="search-wrap" :gutter="24">
              <el-col :span="6">
                <div>
                  <span>日付：</span>
                  <el-date-picker
                    style="width: 100%"
                    v-model="value"
                    type="daterange"
                    start-placeholder=""
                    end-placeholder=""
                    :default-time="['00:00:00', '23:59:59']"
                    size="small"
                  >
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>支部：</span>
                  <el-select name="" placeholder="Select" size="small">
                    <el-option value="0">select-item</el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>コード：</span>
                  <el-input
                    placeholder="内容を入力してください"
                    size="small"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span>備考：</span>
                  <el-input
                    placeholder="内容を入力してください"
                    size="small"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="search-btn-group">
                  <el-button type="danger" size="small">リセット？？</el-button>
                  <el-button type="primary" size="small">検索</el-button>
                </div>
              </el-col>
            </el-row>
          </template>

          <!-- upload機能 -->
          <template v-if="false">
            <Card class="upload-wrap">
              <div slot="header" class="upload-btn">
                <span>ファイルをアップロード</span>
                <el-button type="success">ファイルを選択</el-button>
              </div>
              <el-upload
                class="upload-con"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  こちらにファイルをドラックするか、ファイルを選択ボタンからインポートしてください。
                </div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
            </Card>
          </template>

          <!-- 表を隠し機能 -->
          <template v-if="false">
            <ControlTableShow>
              <TestTable></TestTable>
            </ControlTableShow>
          </template>

          <!-- ExcelTable -->
          <!--          <ExcelTable></ExcelTable>-->

          <div>
            <template v-if="!hide_filter_feature">
              <select v-model="filterInfo" class="filter_feature">
                <option value="0">全カテゴリ</option>
                <option v-for="item in fsData" :key="item.id" :value="item.id">
                  {{ item.attributes.category }}
                </option>
              </select>
            </template>

            <!-- テーブル機能 -->
            <InfoTable></InfoTable>

            <el-table
              v-if="false"
              :data="filterData"
              :default-sort="
                default_sort
                  ? default_sort
                  : { prop: 'id', order: 'descending' }
              "
              row-key="id"
              header-row-class-name="thead-light"
              @selection-change="selectionChange"
            >
              <el-table-column
                v-for="column in head"
                v-if="!column.is_hidden"
                :key="column.label"
                v-bind="column"
              >
                <template v-if="column.type == 'image'" scope="scope">
                  <img
                    style="width: 150px; height: 100px"
                    :src="$castvox.ref_obj(scope.row, column.prop)"
                  />
                </template>
                <template v-else-if="column.type == 'check'" scope="scope">
                  <input
                    type="checkbox"
                    :id="`selected_id_${scope.row.id}`"
                    v-model="scope.row[column.prop]"
                  />
                </template>
                <template v-else-if="column.type == 'hidden'" scope="scope">
                </template>
                <template v-else-if="column.type == 'select'" scope="scope">
                  <badge
                    :type="
                      column.options[$castvox.ref_obj(scope.row, column.prop)]
                        .type
                    "
                    >{{
                      column.options[$castvox.ref_obj(scope.row, column.prop)]
                        .text
                    }}
                  </badge>
                </template>
                <template v-else-if="column.type == 'link'" scope="scope">
                  <a
                    target="_blank"
                    :href="$castvox.ref_obj(scope.row, column.prop)"
                    >{{ $castvox.ref_obj(scope.row, column.prop) }}</a
                  >
                </template>
                <template v-else-if="column.type == 'email'" scope="scope">
                  <a
                    target="_blank"
                    :href="'mailto:' + $castvox.ref_obj(scope.row, column.prop)"
                    >{{ $castvox.ref_obj(scope.row, column.prop) }}</a
                  >
                </template>
                <template v-else-if="column.type == 'datetime'" scope="scope">
                  {{
                    $castvox.get_datetime(
                      $castvox.ref_obj(scope.row, column.prop)
                    )
                  }}
                </template>
                <template v-else-if="column.type == 'date'" scope="scope">
                  {{
                    $castvox.get_date($castvox.ref_obj(scope.row, column.prop))
                  }}
                </template>
                <template v-else scope="scope">
                  {{ $castvox.ref_obj(scope.row, column.prop) }}
                </template>
              </el-table-column>
              <el-table-column min-width="130px" label="操作">
                <template slot-scope="scope">
                  <div class="d-flex">
                    <el-button
                      v-if="is_show_change"
                      type="success"
                      class="btn btn-success"
                      size="small"
                      @click="$nuxt.$emit('change-item', scope.row)"
                      >変更</el-button
                    >
                    <el-button
                      v-if="!hide_edit"
                      type="success"
                      class="btn btn-success"
                      size="small"
                      @click="selectRecord(scope)"
                      >確認</el-button
                    >
                    <el-button
                      v-if="!hide_delete"
                      type="danger"
                      class="btn btn-danger"
                      size="small"
                      @click="deleteInfo(scope)"
                      >削除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="is_show_prio"
                min-width="64px"
                label="優先度"
              >
                <template slot-scope="scope">
                  <div
                    class="
                      d-flex
                      flex-column
                      justify-content-center
                      btn_container
                    "
                  >
                    <el-button
                      type="warning"
                      class="m-1 btn btn-danger"
                      size="small"
                      @click="$nuxt.$emit('priority', scope.row, true)"
                      >Up
                    </el-button>
                    <el-button
                      type="warning"
                      class="m-1 btn btn-danger"
                      size="small"
                      @click="$nuxt.$emit('priority', scope.row, false)"
                      >Down</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
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

      <Modal
        :show="confirmBox.is_show"
        :showClose="true"
        :type="notice"
        size="sm"
      >
        <h6 slot="header" class="modal-title">削除確認</h6>
        <div>削除してもよろしいでしょうか？</div>
        <template slot="footer">
          <div class="d-flex m--4">
            <base-button
              type="cancel"
              class="btn btn-warning"
              :disabled="false"
              @click="onCancel"
              >キャンセル</base-button
            >
            <base-button
              type="danger"
              class="btn btn-danger"
              :disabled="false"
              @click="onDelete"
              >削除</base-button
            >
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import {
  Table,
  Checkbox,
  TableColumn,
  Select,
  Option,
  Input,
  Button,
  Collapse,
  CollapseItem,
  DatePicker,
  Row,
  Col,
  Upload,
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import {
  BasePagination,
  Card,
  BaseButton,
  Modal,
} from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ControlTableShow from "../../../components/layouts/custom/ControlTableShow";
import TestTable from "../../../components/layouts/custom/TestTable";
import ExcelTable from "../../../components/layouts/custom/ExcelTable";
import NewRegister from "../../../components/layouts/custom/NewRegister";
import Search from "../../../components/layouts/custom/Search";
import UploadComponent from "../../../components/layouts/custom/UploadComponent";
import InfoTable from "../../../components/layouts/custom/InfoTable";

const url = process.env.apiUrl;
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);

export default {
  name: "master_list",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  props: {
    page_name: {
      type: String,
      default: "",
    },
    api_name: {
      type: String,
      default: "",
    },
    head: {
      type: Array,
      default: undefined,
    },
    data: {
      type: Array,
      default: undefined,
    },
    edit_to: {
      type: String,
      default: undefined,
    },
    total_data: {
      type: Number,
      default: 0,
    },
    hide_create: {
      type: Boolean,
      default: false,
    },
    hide_edit: {
      type: Boolean,
      default: false,
    },
    hide_delete: {
      type: Boolean,
      default: false,
    },
    is_show_prio: {
      type: Boolean,
      default: false,
    },
    is_show_change: {
      type: Boolean,
      default: false,
    },

    is_show_feature: {
      type: Boolean,
      default: false,
    },
    is_show_submit: {
      type: Boolean,
      default: false,
    },
    is_hook_select: {
      type: Boolean,
      default: false,
    },
    is_hook_delete: {
      type: Boolean,
      default: false,
    },
    default_sort: {
      type: Object,
      default: null,
    },
    hide_filter_feature: {
      type: Boolean,
      default: true,
    },
    fsData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Search,
    BasePagination,
    Card,
    Checkbox,
    Modal,
    BaseButton,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
    Collapse,
    ControlTableShow,
    TestTable,
    ExcelTable,
    NewRegister,
    UploadComponent,
    InfoTable,
  },
  data() {
    return {
      confirmBox: {
        id: 0,
        is_show: false,
      },
      tableData: [],
      selectedRows: [],
      pagination: { perPage: 10, currentPage: 1 },
      filterInfo: "0",
      filterData: [],
    };
  },
  watch: {
    filterInfo: {
      immediate: true,
      handler(n) {
        this.getPageData();
        this.filterData = this.data.filter((data) => {
          if (n == "0") {
            return this.data;
          } else {
            return data.attributes["category_id"] == n;
          }
        });
      },
    },
  },
  methods: {
    getPageData() {
      if (this.data.length == 0) {
        return this.data;
      } else {
        return this.data.slice(
          (this.pagination.currentPage - 1) * this.pagination.perPage,
          (this.pagination.currentPage - 1) * this.pagination.perPage +
            this.pagination.perPage
        );
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },

    selectRecord(arg) {
      if (!this.is_hook_select) {
        if (this.edit_to) {
          this.$router.push(`${this.edit_to}/${arg.row.id}`);
        } else {
          this.$router.push(`${this.$route.fullPath}/detail/${arg.row.id}`);
        }
      } else {
        //
        this.$nuxt.$emit("select_item", arg);
      }
    },

    excelImport() {
      alert("インポート完了");
    },

    createInfo() {
      if (this.edit_to) {
        this.$router.push(`${this.edit_to}`);
      } else {
        this.$router.push(`${this.$route.fullPath}/detail/`);
      }
    },

    deleteInfo(scope) {
      this.confirmBox.is_show = true;
      this.confirmBox.id = scope.row.id;
    },
    async onDelete() {
      if (!this.is_hook_delete) {
        try {
          await this.$axios.$delete(
            `${url}/${this.api_name}/${this.confirmBox.id}`
          );
          this.confirmBox.is_show = false;
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        } catch (e) {
          console.log(e);
        }
      }
      this.$nuxt.$emit("delete_item", this.confirmBox.id);
      this.confirmBox.is_show = false;
    },

    onCancel() {
      this.confirmBox.is_show = false;
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

/deep/ .el-select .el-input .el-input__inner {
  height: 32px;
}

.header-select h3 {
  margin-right: 50px;
}
.collapse-warp {
  padding: 10px 24px;
  margin: 24px 0px;
}

.collapse-warp .collapse-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.collapse-warp .collapse-con label {
  width: 48%;
  margin: 10px;
  font-size: 14px;
}

.collapse-save-warp {
  margin-top: 24px;
  text-align: center;
}

.collapse-btn-group {
  display: flex;
  justify-content: center;
  margin-top: 24px;
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
