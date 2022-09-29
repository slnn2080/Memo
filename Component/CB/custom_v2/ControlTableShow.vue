<template>
  <div class="control-table">
    <div class="header-wrap">
      <h3 class="mb-0">{{ title }}</h3>
      <el-button
        class="btn"
        ref="btn"
        type="primary"
        @click="tableHide"
        size="small"
        :icon="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        plain
      >
        <span>{{ tipCon }}</span>
      </el-button>
    </div>
    <transition name="table-show">
      <div v-show="isShow">
        <slot>デフォルト</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ControlTableShow",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    tipCon() {
      return this.isShow ? "閉じる" : "開く";
    },
  },
  methods: {
    tableHide() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.control-table {
  margin: 48px 0px;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0px 24px;
}

.header-wrap .title {
  font-size: 20px;
  font-weight: 600;
}

.btn {
  width: 95px;
}

.table-show-enter-active,
.table-show-leave-active {
  transition: opacity 0.3s;
}

.table-show-enter,
.table-show-leave-to {
  opacity: 0;
}
</style>
