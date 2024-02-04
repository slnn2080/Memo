<script setup lang="ts">
defineOptions({
  name: 'ScheduleSearchArea'
})
</script>

<template>
  <div class="schedule-search">
    <el-form
      class="schedule-search__form"
      label-position="top"
    >
      <el-row :gutter="16">
        <el-col :span="NaN">
          <el-form-item label="適用日">
            <el-select></el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="NaN">
          <el-form-item label="作業者">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="NaN">
          <el-form-item label="役職">
            <el-select></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="NaN">
          <el-form-item label="所属">
            <el-select></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="NaN">
          <el-form-item label="勤怠パターン">
            <el-select></el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="schedule-search__form-btn">
          <el-button type="primary">
            検索
          </el-button>
          <el-button>クリア</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss">
.schedule-search {
  &__form-btn {
    display: flex;
    justify-content: end;
  }
}
</style>
