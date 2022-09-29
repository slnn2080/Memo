<template>
  <div>
    <el-table
        :data="tableData"
        class="table-wrap"
        header-row-class-name="thead-light"
        @selection-change="handleSelectionChange"
        :span-method="handleMainTable"
        :cell-style="merageCell"
    >
      <el-table-column v-if="hasCheck" type="selection" min-width="50">
      </el-table-column>
      <el-table-column
          v-for="(item, index) of tableColumn"
          :key="index"
          v-bind="item"
      >

        <el-table-column v-if="item.children && item.children.length" v-for="(i, k) of item.children" :key="k" v-bind="i">
          <template scope="scope">
            {{showInfo(scope.row, i)}}
          </template>
        </el-table-column>

        <template v-if="item.type == 'link'" scope="scope">
          <nuxt-link :to="`/user/detail/${scope.row.id}`">{{ scope.row[item.prop] }}</nuxt-link>
        </template>

        <template v-else scope="scope">
          {{ scope.row[item.prop] }}
        </template>
      </el-table-column>
    </el-table>

    <div v-if="showSubTab" class="sub-table">
      <el-row>
        <el-col :span="16">
          <el-table
              :data="subTableData"
              header-row-class-name="thead-light"
          >
            <el-table-column v-for="(item, index) of subTableColumn" :key="index" v-bind="item">
              <el-table-column v-if="item.children && item.children.length" v-for="(i, k) of item.children" :key="k" v-bind="i">
                <template scope="scope">
                  {{showInfo(scope.row, i)}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div v-if="totalTab" class="sub-table total-table">
      <el-row>
        <el-col :span="16">
          <el-table
              :data="totalTabData"
              header-row-class-name="thead-light"
              :header-cell-style="handleHeaderCell"
              border
          >
            <el-table-column v-for="(item, index) of totalTableColumn" :key="index" v-bind="item">
              <el-table-column v-if="item.children && item.children.length" v-for="(i, k) of item.children" :key="k" v-bind="i">
                <template scope="scope">
                  {{showInfo(scope.row, i)}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Row, Col } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);

export default {
  name: "InfoTable",
  methods: {
    // テーブルのセルを結合した場合に　テキスト中央揃え
    // merageCell({row, column, rowIndex, columnIndex}) {
    //   if(this.MerageCell.length) {
    //     for(let i=0; i<this.MerageCell.length; i++) {
    //       if(column.label == this.MerageCell[i].columnLabel && rowIndex == this.MerageCell[i].rowIndex) {
    //         return "text-align: center"
    //       }
    //     }
    //   }
    // },

    // テーブルのセルの中のデータが同じである場合に　行を結合ロジック 目標テーブルに「.table-wrap」などのclassnameをつけてください。
    // merageColumns() {
    //   let allRows = document.querySelectorAll(".table-wrap .el-table__body")[0].rows
    //   let reciprocalTwo = allRows[allRows.length - 2]
    //   let reciprocalOne = allRows[allRows.length - 1]
    //
    //   this.$nextTick(() => {
    //     let oneCells = Array.from(reciprocalOne.cells)
    //     let twoCells = Array.from(reciprocalTwo.cells)
    //     twoCells.forEach((td, index) => {
    //       if(td.children[0].innerHTML == oneCells[index].children[0].innerHTML) {
    //         td.rowSpan = 2
    //         oneCells[index].style.display = "none"
    //       }
    //     })
    //   })
    // },

    handleSelectionChange() {},
    showInfo(row, i) {
      let address = i.prop.split(".")[0]
      let attr = i.prop.split(".")[1]
      return row[address][attr]
    },

    handleMainTable({row, column, rowIndex, columnIndex}) {
      if(this.MerageCellRow.length) {
        for(let i=0; i<this.MerageCellRow.length; i++) {
          if(column.label == this.MerageCellRow[i].columnLabel && rowIndex == this.MerageCellRow[i].rowIndex) {
            return this.MerageCellRow[i].merage
          }
        }
      }
    },
  },
  mounted() {
    this.$emit("setHeaderCellMerged")

    // this.merageCell()
  },
  beforeDestroy() {
    this.$off("setHeaderCellMerged")
  },
  props: {
    MerageCellRow: {
      type: Array,
      default() {
        return []
      }
    },
    totalTabData: {
      type: Array,
      default() {
        return []
      }
    },
    totalTableColumn: {
      type: Array,
      default() {
        return []
      }
    },
    totalTab: {
      type: Boolean,
      default: false
    },
    showSubTab: {
      type: Boolean,
      default: false
    },
    subTableData: {
      type: Array,
      default() {
        return []
      }
    },
    subTableColumn: {
      type: Array,
      default() {
        return []
      }
    },
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
      // rowList: [],
      // spanArr: [],
      // position: 0,
      linkTo: "",
      tableSelectData: [],
    };
  },
};
</script>

<style scoped lang="scss">
.table-wrap /deep/ .el-table__header-wrapper .cell {
  padding-left: 0;
}

.sub-table {
  margin-top: 32px;
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
