# User Management

The theme comes with an out of the box user management option. To access this option ,click the "**Examples/User Management**" link in the left sidebar or add **/examples/user-management/list-users** to the URL.
The first thing you will see is a list of existing users. You can add new ones by clicking the "**Add user**" button (above the table on the right). On the Add user page, you will find a form which allows you to fill out the user`s name, email, role and password.

You can find the compoments for role functionality in `pages\examples\user-management` folder.

Once you add more users, the list will grow and for every user you will have edit and delete options (access these options by clicking the three dotted menu that appears at the end of every row).

```
<el-table
  class="table-responsive align-items-center table-flush"
  header-row-class-name="thead-light"
  :data="users"
  @sort-change="sortChange"
>
  <div slot="empty" v-if="loading">
    <img src="/img/loading.gif" style="height: 100px; width: 100px" />
  </div>
  <el-table-column label="Author" min-width="50px">
    <template v-slot="{ row }">
      <img
        v-if="row.profile_image"
        :src="row.profile_image"
        class="avatar rounded-circle mr-3"
      />
    </template>
  </el-table-column>

  <el-table-column
    label="Name"
    min-width="60px"
    prop="name"
    sortable="custom"
  />
  <el-table-column
    label="Email"
    min-width="90px"
    prop="email"
    sortable="custom"
  />
  <el-table-column
    label="Role"
    min-width="60px"
    prop="roles.name"
    sortable="custom"
  >
    <template v-slot="{ row }">
      <span>{{ row.roles[0].name }}</span>
    </template>
  </el-table-column>
  <el-table-column
    label="Created At"
    prop="created_at"
    min-width="100px"
    sortable="custom"
  />
  <el-table-column min-width="50px" align="center">
    <div slot-scope="{ row }" class="table-actions">
      <el-tooltip content="Edit" placement="top">
        <a
          type="text"
          @click="editUser(row)"
          class="table-action"
          data-toggle="tooltip"
          style="cursor: pointer"
        >
          <i class="fas fa-user-edit"></i>
        </a>
      </el-tooltip>

      <el-tooltip content="Delete" placement="top">
        <a
          type="text"
          @click="deleteUser(row.id)"
          class="table-action table-action-delete"
          data-toggle="tooltip"
          style="cursor: pointer"
        >
          <i class="fas fa-trash"></i>
        </a>
      </el-tooltip>
    </div>
  </el-table-column>
</el-table>
```
