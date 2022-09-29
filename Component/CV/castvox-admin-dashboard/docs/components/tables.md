# Tables

Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with Bootstrap.

<hr>

### Examples


:::demo
```html
<template>
    <div class="card">
        <div class="border-0 card-header">
            <h3 class="mb-0">Light table</h3>
        </div>

        <el-table class="table-responsive table-flush"
                  header-row-class-name="thead-light"
                  :data="projects">
            <el-table-column label="Project"
                             min-width="310px"
                             prop="name"
                             sortable>
                <template v-slot="{row}">
                    <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <div class="media-body">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Budget"
                             prop="budget"
                             min-width="140px"
                             sortable>
            </el-table-column>

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status"
                             sortable>
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Users" min-width="190px">
                <div class="avatar-group">
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Ryan Tompson">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-1.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Romina Hadid">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-2.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Alexander Smith">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-3.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Jessica Doe">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-4.jpg">
                    </a>
                </div>
            </el-table-column>

            <el-table-column label="Completion"
                             prop="completion"
                             min-width="260px"
                             sortable>
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column min-width="180px">
                <template v-slot="{row}">
                    <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only text-light">
                      <i class="fas fa-ellipsis-v mt-2"></i>
                    </span>
                        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <div class="card-footer py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :total="50"></base-pagination>
        </div>
    </div>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        projects: [
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ],
        currentPage: 1
      };
    }
  }
</script>

```
:::


### Dark Table

:::demo
```html
<template>
    <div class="card bg-default shadow">
        <div class="card-header bg-transparent border-0">
            <h3 class="mb-0 text-white">Dark table</h3>
        </div>

        <el-table class="table-responsive table-dark"
                  header-row-class-name="thead-dark"
                  :data="projects">
            <el-table-column label="Project"
                             min-width="310px"
                             prop="name"
                             sortable>
                <template v-slot="{row}">
                    <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <div class="media-body">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Budget"
                             prop="budget"
                             min-width="140px"
                             sortable>
            </el-table-column>

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status"
                             sortable>
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Users" min-width="190px">
                <div class="avatar-group">
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Ryan Tompson">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-1.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Romina Hadid">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-2.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Alexander Smith">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-3.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Jessica Doe">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-4.jpg">
                    </a>
                </div>
            </el-table-column>

            <el-table-column label="Completion"
                             prop="completion"
                             min-width="260px"
                             sortable>
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column min-width="180px">
                <template v-slot="{row}">
                    <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only text-light">
                      <i class="fas fa-ellipsis-v mt-2"></i>
                    </span>
                        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        projects: [
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ],
        currentPage: 1
      };
    }
  }
</script>
```
:::


<script>
  export default {
    data() {
      return {
        projects: [
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ],
        currentPage: 1
      };
    }
  }
</script>
