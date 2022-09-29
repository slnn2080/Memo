# Item Management

Item management is the most advanced example included in the Pro theme, because every item has a picture, belongs to a category and has multiple tags. To access this example click the "**Examples/Item Management**" link in the left sidebar or add **/examples/item-management/list-items** to the URL.
Here you can manage the items. A list of items will appear once you start adding them (to access the add page click "**Add item**").
On the add page, besides the Name and Description fields (which are present in most of the CRUD examples) you can see a category dropdown, which contains the categories you added, a file input and a tag multi select. If you did not add any categories or tags, please go to the corresponding sections (category management, tag management) and add some.

You can find the compoments for items functionality in `pages\examples\item-management` folder.

### List Items

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
    :data="items"
    @sort-change="sortChange"
  >
    <div slot="empty" v-if="loading">
      <img src="/img/loading.gif" style="height: 100px; width: 100px" />
    </div>

    <el-table-column
      label="Name"
      min-width="240px"
      prop="name"
      sortable="custom"
    />
    <el-table-column
      label="Category"
      min-width="140px"
      prop="category.name"
      sortable="custom"
    />

    <el-table-column label="Picture" min-width="150px">
      <template v-slot="{ row }">
        <img
          v-if="row.image"
          :src="row.image"
          style="width: 100px; height: auto"
          alt="avatar"
        />
      </template>
    </el-table-column>

    <el-table-column
      label="Tags"
      min-width="170px"
      max-width="400px"
      prop="tags.name"
      sortable="custom"
    >
      <template slot-scope="{ row }">
        <span
          v-for="(tag, index) in row.tags"
          :key="'tag' + index"
          class="badge badge-default"
          :style="{ backgroundColor: tag.color, margin: '.1rem' }"
          >{{ tag.name }}</span
        >
      </template>
    </el-table-column>

    <el-table-column
      label="Created At"
      prop="created_at"
      min-width="190px"
      sortable="custom"
    />
    <el-table-column min-width="120px" align="center">
      <div slot-scope="{ row }" class="table-actions">
        <el-tooltip content="Edit" placement="top">
          <a
            type="text"
            @click="editItem(row)"
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
            @click="deleteItem(row.id)"
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

### Add/Edit Item

```
<card>
  <div slot="header" class="row align-items-center">
    <div class="col-8">
      <h3 class="mb-0">Add Item</h3>
    </div>
    <div class="col-4 text-right">
      <base-button
        @click="goBack"
        type="button"
        class="btn btn-sm btn-primary"
        >Back to list</base-button
      >
    </div>
  </div>
  <div class="card-body">
    <form ref="profile_form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-control-label"> Picture </label>
        <div v-if="file" class="profile-image card-img pb-4">
          <img :src="`${image}`" class="profile-image argon-image" />
        </div>
        <div v-else class="profile-image">
          <img src="/img/placeholder.jpg" class="argon-image" />
        </div>
        <div class="image-upload">
          <base-button
            v-if="file"
            type="button"
            class="btn btn-sm btn-danger"
            @click="removeImage"
          >
            <span>
              <i class="fa fa-times" />
              Remove
            </span>
          </base-button>
          <base-button type="button" class="btn btn-sm btn-primary">
            <label v-if="!file" for="imageInput" class="mb-0"
              >Select image</label
            >
            <label v-else for="imageInput" class="mb-0">Change</label>
            <input
              id="imageInput"
              ref="imageInput"
              accept="image/*"
              type="file"
              style="display: none"
              @change="onSelectFile"
            />
          </base-button>
        </div>
      </div>
      <validation-error :errors="apiValidationErrors.attachment" />

      <base-input
        label="Name"
        prepend-icon="fas fa-user"
        v-model="item.name"
      />
      <validation-error :errors="apiValidationErrors.name" />

      <base-input label="Description">
        <html-editor v-model="item.description" name="editor" />
      </base-input>
      <validation-error :errors="apiValidationErrors.excerpt" />

      <base-input label="Category">
        <el-select
          name="category"
          v-model="item.category.id"
          prepend-icon="fas fa-user"
        >
          <el-option
            v-for="single_category in all_categories"
            :key="single_category.id"
            :value="single_category.id"
            :label="single_category.name"
          >
          </el-option>
        </el-select>
      </base-input>

      <base-input label="Tags">
        <el-select v-model="tags" multiple placeholder="Select...">
          <el-option
            v-for="single_tag in all_tags"
            :key="single_tag.id"
            :value="single_tag.id"
            :label="single_tag.name"
          >
          </el-option>
        </el-select>
      </base-input>

      <base-input label="Status">
        <base-radio v-model="item.status" name="published" class="mb-3">
          Published
        </base-radio>
        <base-radio v-model="item.status" name="draft" class="mb-3">
          Draft
        </base-radio>
        <base-radio v-model="item.status" name="archive" class="mb-3">
          Archive
        </base-radio>
      </base-input>

      <base-input label="Show on homepage?">
        <base-switch
          class="mr-1"
          v-model="item.is_on_homepage"
        ></base-switch>
      </base-input>

      <base-input label="Date">
        <flat-picker
          slot-scope="{ focus, blur }"
          @on-open="focus"
          @on-close="blur"
          :config="{ allowInput: true }"
          class="form-control datepicker"
          v-model="item.date_at"
        >
        </flat-picker>
      </base-input>
      <validation-error :errors="apiValidationErrors.date_at" />

      <div class="my-4">
        <base-button
          type="button"
          class="btn btn-sm btn-primary"
          native-type="submit"
        >
          Add Item
        </base-button>
      </div>
    </form>
  </div>
</card>
```
