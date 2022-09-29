<template>
  <el-table
    :data="editorTableData"
    class="table-wrap"
    row-key="username"
    header-row-class-name="thead-light"
    @selection-change="handleSelectionChange"
    @cell-dblclick="tabClick"
  >
    <el-table-column v-if="hasCheck" type="selection" min-width="50">
    </el-table-column>
    <el-table-column
      v-for="(item, index) of tableColumn"
      :key="index"
      v-bind="item"
    >
      <template v-if="item.type == 'link'" scope="scope">
        <nuxt-link :to="linkTo">{{scope.row[item.prop]}}</nuxt-link>
      </template>
      <template v-else-if="item.type == 'editor'" scope="scope">
        <el-input v-if="scope.row.show" v-model="scope.row[item.prop]" @blur="blurInput(scope.row, item.prop, $event)"></el-input>
        <span v-else>{{scope.row[item.prop]}}</span>
      </template>
      <template v-else scope="scope">
        {{scope.row[item.prop]}}
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
  name: "EditorTable",
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
      tableList: [],
      editorTableData: []
    };
  },
  methods: {
    tabClick(row, column, el, e) {
      this.$set(row, "show", true)
    },
    blurInput(row) {
      this.$set(row, "show", false)
    }
  },
  computed: {
    info() {
      return (row, prop) => {
        return row[prop];
      };
    },
  },
  created() {
    this.editorTableData = this.tableData
    this.editorTableData.forEach((item, index) => {
      this.$set(item, "show", false)
    })
  }
};
</script>

<style scoped>
.table-wrap {
  margin-top: 24px;
}

.input_item {
  border: none;
}
</style>
