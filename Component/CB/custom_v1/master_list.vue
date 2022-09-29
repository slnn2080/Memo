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
              <h3 class="mb-0">{{ page_name }}</h3>
              <div>
                <el-button
                  v-if="!hide_create"
                  type="primary"
                  class="btn btn-primary"
                  @click="createInfo"
                  >新規</el-button
                >
                <el-button
                  v-if="is_show_feature"
                  type="danger"
                  class="btn btn-primary"
                  @click="$nuxt.$emit('update-feature')"
                  >注目キャストを取得</el-button
                >
                <el-button
                  v-if="is_show_submit"
                  type="primary"
                  class="btn btn-primary"
                  @click="handleSubmitEmit"
                  >更新</el-button
                >
              </div>
            </div>
          </template>
          <div>
            <template v-if="!hide_filter_feature">
              <select v-model="filterInfo" class="filter_feature">
                <option value="0">全カテゴリ</option>
                <option v-for="item in fsData" :key="item.id" :value="item.id">
                  {{ item.attributes.category }}
                </option>
              </select>
            </template>
            <el-table
              :data="getPageDataWithFilter()"
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
                :prop="column.prop"
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
                <template
                  v-else-if="column.type == 'select_category'"
                  scope="scope"
                >
                  <badge
                    v-if="get_select_category(scope.row, column.prop)"
                    :type="get_select_category(scope.row, column.prop).type"
                    >{{ get_select_category(scope.row, column.prop).text }}
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
                <template v-else-if="column.type == 'query'" scope="scope">
                  {{ queryShowData($castvox.ref_obj(scope.row, column.prop)) }}
                </template>
                <template
                  v-else-if="column.type == 'contractor_attr'"
                  scope="scope"
                >
                  {{ contractorAttr($castvox.ref_obj(scope.row, column.prop)) }}
                </template>
                <template v-else-if="column.type == 'contractor'" scope="scope">
                  {{
                    contractorName(
                      scope.row.attributes,
                      $castvox.ref_obj(scope.row, column.prop)
                    )
                  }}
                </template>
                <template v-else-if="column.type == 'plan'" scope="scope">
                  {{ $castvox.ref_obj(scope.row, column.prop).meta.name[0] }}
                </template>
                <template
                  v-else-if="column.type == 'works_status'"
                  scope="scope"
                >
                  <badge
                    :type="
                      column.options[$castvox.ref_obj(scope.row, column.prop)]
                        .type
                    "
                    >{{
                      statusShowData($castvox.ref_obj(scope.row, column.prop))
                    }}
                  </badge>
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
                      @click.prevent="selectRecord(scope)"
                      >確認</el-button
                    >
                    <el-button
                      v-if="!hide_delete"
                      type="danger"
                      class="btn btn-danger"
                      size="small"
                      @click.prevent="deleteInfo(scope)"
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
        @close="handleClosed"
      >
        <h6 slot="header" class="modal-title">削除確認</h6>
        <div>削除してもよろしいでしょうか？</div>
        <template slot="footer">
          <div class="d-flex m--4">
            <base-button
              type="cancel"
              class="btn btn-warning"
              :disabled="false"
              @click.prevent="onCancel"
              >キャンセル</base-button
            >
            <base-button
              type="danger"
              class="btn btn-danger"
              :disabled="false"
              @click.prevent="onDelete"
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
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import {
  BasePagination,
  Card,
  BaseButton,
  Modal,
} from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
const url = process.env.apiUrl;
Vue.use(Button);

export default {
  name: "master_list",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  props: {
    enterDetailPage: {
      type: Boolean,
      default: false,
    },
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
    select_category: {
      type: Array,
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
  computed: {
    contractorAttr() {
      return (value) => {
        if (value == 1) {
          return "クライアント";
        } else if (value == 2) {
          return "キャスト";
        } else if (value == 3) {
          return "クライアント＋キャスト";
        } else {
          return "";
        }
      };
    },
    contractorName() {
      return (row, prop) => {
        return `${row["last_name"]} ${prop}`;
      };
    },

    queryShowData() {
      return (value) => {
        if (value == 0) {
          return "クライアント契約について";
        } else if (value == 1) {
          return "キャスト情報登録について";
        } else if (value == 2) {
          return "その他のお問い合わせ";
        }
      };
    },
    statusShowData() {
      return (value) => {
        if (value == "0") {
          return "不明";
        } else if (value == "1") {
          return "確定";
        } else if (value == "2") {
          return "提案";
        } else if (value == "3") {
          return "その他";
        }
      };
    },
  },
  methods: {
    handleSubmitEmit() {
      this.$nuxt.$emit("submit");
    },
    handleClosed() {
      this.confirmBox.is_show = false;
    },
    getPageDataWithFilter() {
      let n = this.filterInfo;
      let filter = this.data.filter((data) => {
        if (n == "0") {
          return this.data;
        } else {
          return data.attributes["category_id"] == n;
        }
      });
      //ページングが無効に
      if (filter.length != 0) {
        return filter.slice(
          (this.pagination.currentPage - 1) * this.pagination.perPage,
          (this.pagination.currentPage - 1) * this.pagination.perPage +
            this.pagination.perPage
        );
      } else {
        return filter;
      }
    },

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
          if (
            this.enterDetailPage &&
            this.$route.query &&
            this.$route.query.top_ids
          ) {
            this.$router.push(`casts/detail/${arg.row.id}`);
          } else {
            this.$router.push(`${this.$route.fullPath}/detail/${arg.row.id}`);
          }
        }
      } else {
        //
        this.$nuxt.$emit("select_item", arg);
      }
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
    get_select_category(row, prop) {
      if (this.select_category) {
        let f = this.select_category.filter((e) => {
          return e.id == this.$castvox.ref_obj(row, prop);
        });
        return f[0];
      }
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
</style>
