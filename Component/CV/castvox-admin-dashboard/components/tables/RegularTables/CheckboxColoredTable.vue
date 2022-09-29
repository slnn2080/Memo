<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Checkbox + Labels</h3>
        </div>
        <div class="col-6 text-right">
          <el-tooltip content="Delete" placement="top">
            <base-button type="danger" icon size="sm">
              <span class="btn-inner--icon"><i class="fas fa-trash"></i></span>
              <span class="btn-inner--text">Delete</span>
            </base-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive table-flush"
      header-row-class-name="thead-light"
      row-key="id"
      :data="users"
      :row-class-name="rowClassName"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" align="left" min-width="120px">
      </el-table-column>

      <el-table-column label="Author" min-width="220px" prop="name" sortable>
        <template v-slot="{ row }">
          <div class="table-user">
            <b>{{ row.name }}</b>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Created At"
        prop="createdAt"
        width="170px"
        min-width="140px"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="Product"
        min-width="180px"
        prop="product"
        sortable
      >
        <template v-slot="{ row }">
          <a href="#!" class="font-weight-bold">{{ row.product }}</a>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px"
        label="Active"
        prop="active"
        sortable
        align="center"
      >
        <template v-slot="{ row }">
          <div class="d-flex justify-content-center">
            <base-switch v-model="row.active"></base-switch>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import users from "./../users";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
} from "element-ui";

export default {
  name: "inline-actions-table",
  components: {
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  data() {
    return {
      users,
      currentPage: 1,
      selectedRows: [],
    };
  },
  methods: {
    onEdit(row) {
      alert(`You want to edit ${row.name}`);
    },
    onDelete(row) {
      alert(`You want to delete ${row.name}`);
    },
    onSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    rowClassName({ rowIndex }) {
      if (rowIndex === 0) {
        return "table-success";
      } else if (rowIndex === 2) {
        return "table-warning";
      }
      return "";
    },
  },
};
</script>
