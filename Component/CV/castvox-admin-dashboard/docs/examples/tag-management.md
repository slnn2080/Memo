# Tag Management

Out of the box you will have an example of tag management (for the cases in which you are developing a blog or a shop). To access this example, click the "**Examples/Tag Management**" link in the left sidebar or add **/examples/tag-management/list-tags** to the URL.
You can add and edit tags here, but you can only delete them if they are not attached to any items.

You can find the compoments for role functionality in `pages\examples\tag-management` folder.

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
      <form>
        <base-input
          v-model="query"
          type="search"
          prepend-icon="fas fa-search"
          placeholder="Search..."
          clearable
        />
      </form>
    </div>
  </div>
  <el-table
    class="table-responsive align-items-center table-flush"
    header-row-class-name="thead-light"
    :data="tags"
    @sort-change="sortChange"
  >
    <div slot="empty" v-if="loading">
      <img src="/img/loading.gif" style="height: 100px; width: 100px" />
    </div>
    <el-table-column label="Name" prop="name" sortable="custom" />
    <el-table-column label="Color">
      <template slot-scope="{ row }">
        <span
          class="badge badge-default"
          :style="{ backgroundColor: row.color }"
          >{{ row.name }}</span
        >
      </template>
    </el-table-column>
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
            @click="editTag(row)"
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
            @click="deleteTag(row.id)"
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
</div>
```
