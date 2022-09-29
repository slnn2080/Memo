<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Striped Table</h3>
        </div>
        <div class="col-6 text-right">
          <el-tooltip content="Export" placement="top">
            <base-button type="primary" icon size="sm">
              <span class="btn-inner--icon"
                ><i class="fas fa-user-edit"></i
              ></span>
              <span class="btn-inner--text">Export</span>
            </base-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive align-items-center table-flush table-striped"
      header-row-class-name="thead-light"
      :data="users"
    >
      <el-table-column label="Author" min-width="310px" prop="name" sortable>
        <template v-slot="{ row }">
          <img :src="row.image" class="avatar rounded-circle mr-3" />
          <b>{{ row.name }}</b>
        </template>
      </el-table-column>
      <el-table-column
        label="Created At"
        prop="createdAt"
        min-width="140px"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="Product"
        min-width="200px"
        prop="product"
        sortable
      >
        <template v-slot="{ row }">
          <a href="#!" class="font-weight-bold">{{ row.product }}</a>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center">
        <div slot-scope="{ row }" class="table-actions">
          <el-tooltip content="Edit" placement="top">
            <a
              href="#!"
              @click.prevent="onEdit(row)"
              class="table-action"
              data-toggle="tooltip"
              data-original-title="Edit product"
            >
              <i class="fas fa-user-edit"></i>
            </a>
          </el-tooltip>
          <el-tooltip content="Delete" placement="top">
            <a
              href="#!"
              @click.prevent="onDelete(row)"
              class="table-action table-action-delete"
              data-toggle="tooltip"
              data-original-title="Delete product"
            >
              <i class="fas fa-trash"></i>
            </a>
          </el-tooltip>
        </div>
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
    };
  },
  methods: {
    onEdit(row) {
      alert(`You want to edit ${row.name}`);
    },
    onDelete(row) {
      alert(`You want to delete ${row.name}`);
    },
  },
};
</script>
