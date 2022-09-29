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
              <el-button
                v-if="!hide_create"
                type="primary"
                class="btn btn-primary"
                @click="createInfo"
                >新規</el-button
              >
            </div>
          </template>
          <div>
            <el-table
              :data="getPageData()"
              :default-sort="{ prop: 'id', order: 'descending' }"
              row-key="id"
              header-row-class-name="thead-light"
              @selection-change="selectionChange"
            >
              <el-table-column
                v-for="column in head"
                :key="column.label"
                v-bind="column"
              >
                <template v-if="column.type == 'image'" scope="scope">
                  <img
                    style="width: 150px; height: 100px"
                    :src="$castvox.ref_obj(scope.row, column.prop)"
                  />
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
                  <el-button
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

import { Table, TableColumn, Select, Option, Input, Button } from "element-ui";
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
    hide_delete: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BasePagination,
    Card,
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
    };
  },
  methods: {
    getPageData() {
      // console.log(this.data);
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
      if (this.edit_to) {
        this.$router.push(`${this.edit_to}/${arg.row.id}`);
      } else {
        this.$router.push(`${this.$route.fullPath}/detail/${arg.row.id}`);
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
      try {
        await this.$axios.$delete(
          `${url}/${this.api_name}/${this.confirmBox.id}`
        );
        this.confirmBox.is_show = false;
        this.$router.go({ path: this.$router.currentRoute.path, force: true });
      } catch (e) {
        console.log(e);
      }
    },

    onCancel() {
      this.confirmBox.is_show = false;
    },
  },
};
</script>
<style scoped>
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
</style>
