# Role Management

The Pro theme allows you to add user roles. By default, the theme comes with **Admin**, **Creator** and **Member** roles. To access the role management example click the "**Examples/Role Management**" link in the left sidebar or add **/examples/role-management/list-roles** to the URL. Here you can add/edit new roles.
To add a new role, click the "**Add role**" button. To edit an existing role, click the dotted menu (available on every table row) and then click "**Edit**". In both cases, you will be directed to a form which allows you to modify the name and description of a role.

You can find the compoments for role functionality in `pages\examples\role-management` folder.

### List page

```
<div>
  <div
    class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
  >
    <el-select
      class="select-primary pagination-select"
      v-model="pagination.perPage"
      placeholder="Per page"
    >
      <el-option
        class="select-primary"
        v-for="item in pagination.perPageOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <div>
      <base-input
        v-model="query"
        type="search"
        prepend-icon="fas fa-search"
        placeholder="Search..."
        clearable
      />
    </div>
  </div>
  <el-table
    class="table-responsive align-items-center table-flush"
    header-row-class-name="thead-light"
    :data="roles"
    @sort-change="sortChange"
  >
    <div slot="empty" v-if="loading">
      <img src="/img/loading.gif" style="height: 100px; width: 100px" />
    </div>
            <el-table-column label="Name" prop="name" sortable="custom" />
    <el-table-column
      label="Created At"
      prop="created_at"
      sortable="custom"
    />
    <el-table-column align="center">
      <div slot-scope="{ row }" class="table-actions">
        <el-tooltip content="Edit" placement="top">
          <a
            type="text"
            @click="editRole(row)"
            class="table-action"
            data-toggle="tooltip"
            style="cursor: pointer"
          >
            <i class="fas fa-user-edit" />
          </a>
        </el-tooltip>

        <el-tooltip content="Delete" placement="top">
          <a
            type="text"
            @click="deleteRole(row.id)"
            class="table-action table-action-delete"
            data-toggle="tooltip"
            style="cursor: pointer"
          >
            <i class="fas fa-trash" />
          </a>
        </el-tooltip>
      </div>
    </el-table-column>
  </el-table>
</div>
```

### Add/edit role

```
<div class="card-body">
  <form ref="profile_form" @submit.prevent="handleSubmit">
    <base-input
      label="Name"
      prepend-icon="fas fa-user"
      v-model="role.name"
    />
    <validation-error :errors="apiValidationErrors.name" />
    <div class="my-4">
      <base-button
        type="button"
        class="btn btn-sm btn-primary"
        native-type="submit"
      >
        Add Role
      </base-button>
    </div>
  </form>
</div>
```
