<template>
  <el-row>
      <el-table :empty-text="emptyText" :fit="fit" :data="tableData" style="width: 100%" :max-height="maxHeight" border @cell-click="mouseClick" highlight-current-row @row-contextmenu="rightClick" @cell-mouse-leave="mouseOut" ref="editTable">
        <el-table-column type="index" width="50" label="序号" v-if="columnData.length!==0">
        </el-table-column>
        <el-table-column :prop="item.prop" :label="item.label" v-for="(item,index) in columnData" :key="index" :min-width="item.width">
          <template slot-scope="scope">
            <template v-if="item.attributes.type=='input'">
              <el-input @input="changeInput(item.prop,scope.row)" size="mini" v-show="scope.row['$edit$'+index]" v-model="scope.row[item.prop]"></el-input>
              <div class="table-span" :title="scope.row[item.prop]">
                <span v-show="!scope.row['$edit$'+index]">{{scope.row[item.prop]}}</span>
              </div>
            </template>
            <template v-else-if="item.attributes.type=='select'">
              <div v-show="scope.row['$edit$'+index]">
                <el-select size="mini" v-model="scope.row[item.prop]" @blur="scope.row['$edit$'+index]=true" @visible-change="selectVisible($event,item.prop,scope.row[item.prop],scope.row,item.attributes.selectData)" @change="selectChange(item.prop,scope.row[item.prop],scope.row)">
                  <el-option :label="item.value" :value="item.key" v-for="(item,index) in item.attributes.selectData" :key="index"></el-option>
                </el-select>
              </div>
              <div v-show="!scope.row['$edit$'+index]">
                <div class="table-span" :title="scope.row[item.prop]">
                  <span>{{renderer(item.prop,scope.row[item.prop])}}</span>
                </div>
              </div>
            </template>
          </template>
        </el-table-column>
      </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    initNum: {
      type: Number,
      required: false,
      default: 0
    },
    columnData: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    maxHeight: {
      type: Number,
      required: false
    },
    notIncluded: {
      type: Array,
      required: false,
      default: () => []
    },
    fit: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      required: false,
      default: () => "暂无数据"
    }
  },
  computed: {},
  methods: {
    //点击单元格
    mouseClick(row, column, cell, event) {
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
      for (let i = 0; i < this.columnData.length; i++) {
        if (this.columnData[i].prop === column.property)
          row["$edit$" + i] = true;
        else
          row["$edit$" + i] = false;
      }
    },
    //鼠标移出单元格
    mouseOut(row, column, cell, event) {
      for (let i = 0; i < this.columnData.length; i++) {
        row["$edit$" + i] = false;
      }
    },
    //监听输入框
    changeInput(prop, row) {
      this.$emit('changeInput', prop, row);
    },
    //监听下拉收起展开
    selectVisible(event, prop, key, row, datas) {
      if (!event) {
        for (let i = 0; i < this.columnData.length; i++) {
          row["$edit$" + i] = false;
        }
      }
      this.$emit('selectVisible', event, prop, key, row);
    },
    //监听下拉框变化
    selectChange(prop, key, row) {
      this.$emit('selectChange', prop, key, row);
    },
    //表格右击
    rightClick(row, column, event) {
      this.rowIndex = row.$index$;
    },
    //菜单
    showMainMenu(e) {
      this.$refs['setting-dialog'].showMenu(e);
    },
    //new一个表格数据
    getNewRow() {
      let row = {};
      this.$set(row, "$index$", this.tableData.length);
      for (let i = 0; i < this.columnData.length; i++) {
        this.$set(row, this.columnData[i].prop, "");
      }
      for (let i = 0; i < this.columnData.length; i++) {
        if (this.notIncluded.length != 0) {
          if (this.notIncluded.indexOf(this.columnData[i].prop) < 0) {
            this.$set(row, "$edit$" + i, false);
          }
        } else {
          this.$set(row, "$edit$" + i, false);
        }
      }
      return row;
    },
    //索引重置（不然删除等操作会有错误）
    reSort() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].$index$ = i;
      }
    },
    //新增一行
    addRow() {
      let row = this.getNewRow();
      this.tableData.push(row);
      if (this.$refs['setting-dialog'])
        if (this.$refs['setting-dialog'])
          this.$refs['setting-dialog'].hideMenu();
    },
    //向前插入
    inserRowBefore() {
      let row = this.getNewRow();
      this.tableData.splice(this.rowIndex, 0, row);
      this.reSort();
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
    },
    //向后插入
    inserRowAfter() {
      let row = this.getNewRow();
      this.tableData.splice(this.rowIndex + 1, 0, row);
      this.reSort();
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
    },
    //上移
    upRow() {
      if (this.rowIndex != 0) {
        let row = this.tableData.splice(this.rowIndex, 1)[0];
        this.tableData.splice(this.rowIndex - 1, 0, row);
        this.reSort();
      }
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
      return;
    },
    //下移
    downRow() {
      if (this.rowIndex != this.tableData.length - 1) {
        let row = this.tableData.splice(this.rowIndex, 1)[0];
        this.tableData.splice(this.rowIndex + 1, 0, row);
        this.reSort();
      }
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
      return;
    },
    //删除当前行
    deleteRow() {
      this.tableData.splice(this.rowIndex, 1);
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
      this.reSort();
    },
    //删除所选行
    deleteRows() {
      this.tableData.splice(0);
      if (this.$refs['setting-dialog'])
        this.$refs['setting-dialog'].hideMenu();
    },
    //格式化（下拉框值进行key-value格式化）
    renderer(prop, value) {
      let me = this;
      let renderer = null;
      for (let i = 0; i < this.columnData.length; i++) {
        if (this.columnData[i].prop === prop) {
          let selectData = this.columnData[i].attributes.selectData;
          for (let j = 0; j < selectData.length; j++) {
            if (value === selectData[j].key) {
              renderer = selectData[j].value;
            }
          }
        }
      }
      return renderer || value;
    }
  },
  created() {
    for (let i = 0; i < this.tableData.length; i++) {
      this.$set(this.tableData[i], "$index$", i);
      for (let j = 0; j < this.columnData.length; j++) {
        if (this.notIncluded.length != 0) {
          if (this.notIncluded.indexOf(this.columnData[j].prop) < 0) {
            this.$set(this.tableData[i], "$edit$" + j, false);
          }
        } else {
          this.$set(this.tableData[i], "$edit$" + j, false);
        }
      }
    }
    if (!(this.tableData && this.tableData.length))
      for (let i = 0; i < this.initNum; i++) {
        this.addRow();
      }
  }
}
</script>
<style lang="less" scoped>
.table-span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>


