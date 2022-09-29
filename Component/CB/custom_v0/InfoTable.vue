<template>
  <el-table
    :data="tableData"
    class="table-wrap"
    row-key="username"
    header-row-class-name="thead-light"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="hasCheck" type="selection" min-width="50">
    </el-table-column>
    <el-table-column
      v-for="(item, index) of tableColumn"
      :key="index"
      v-bind="item"
    >
      <template v-if="item.type == 'link'" scope="scope">
        <nuxt-link :to="linkTo">{{ info(scope.row, item.prop) }}</nuxt-link>
      </template>
      <template v-else scope="scope">
        {{ info(scope.row, item.prop) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: "InfoTable",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableColumn: {
      type: Array,
      default() {
        return [];
      },
    },
    hasCheck: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      linkTo: "",
      tableSelectData: [],
    };
  },
  computed: {
    info() {
      return (row, prop) => {
        return row[prop];
      };
    },
  },
};
</script>

<style scoped lang="scss">
.table-wrap {
  margin-top: 24px;
}

@media print {
  .el-table {
    .el-table__body {
      width: 100% !important;
    }
    th {
      display: table-cell !important;
    }
    .cell {
      width: 100% !important;
      background-color: red !important;
    }
  }
}
</style>
