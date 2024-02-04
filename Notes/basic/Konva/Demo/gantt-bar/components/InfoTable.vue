<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { infoItemType } from '@/types/schedule/api'

import type { headrType } from '@/types/schedule/screen'

defineOptions({
  name: 'InfoTable'
})

type propsType = {
  headers: headrType[],
  list: infoItemType[],
  tableWidth: number,
  isCollapsed: boolean
}

const props = withDefaults(defineProps<propsType>(), {
  tableWidth: 0,
  isCollapsed: false,
  headrs: () => [],
  list: () => []
})

const infoTableRef = ref()

const tableData = computed(() => props.list)

// const colunmName = ['勤務開始', '勤務終了', '昼休み', '休憩', 'RA対象外']
// const targetColumns = computed(() => {
//   const labels = props.headers.map(item => item.label)
//   return colunmName.map(item => labels.indexOf(item))
// })
// console.log(targetColumns)

const emit = defineEmits(['addBreakBarEvent'])

const timeChangeHandler = (id: string, type: string, time: string): void => {
  emit('addBreakBarEvent', id, type, time)
}

// watch(props.isCollapsed, (n) => {
//   if (n) {
//     hideColumnsHandler()
//   }
// })

// const hideColumnsHandler = (): void => {
//   const oTable = infoTableRef.value
//   const thead = oTable.querySelector('thead')
//   const tbody = oTable.querySelector('tbody')

//   const ths = thead.querySelector('tr').querySelectorAll('th')
//   console.log(oTable, thead, tbody, ths)

//   targetColumns.value.forEach(index => {
//     ths[index].style.display = 'none'
//   })

//   const trs = tbody.querySelectorAll('tr')
//   trs.forEach(tr => {
//     const tds = tr.querySelectorAll('td')
//     targetColumns.value.forEach(index => {
//       tds[index].style.display = 'none'
//     })
//   })
// }

onMounted(() => {
  // hideColumnsHandler()
})
</script>

<template>
  <div class="info-table">
    <table
      ref="infoTableRef"
      class="info-table__table"
      :style="{ width: tableWidth + 'px' }"
    >
      <thead>
        <tr>
          <th
            v-for="(item, index) in headers"
            :key="index"
            class="info-table__header"
            :style="`
              width: ${item.width}px;
            `"
            :data-time="`${item.value}`"
          >
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          class="info-table__content"
          :class="{'info-table__content-holiday': row.workStartTime === '休み'}"
        >
          <td>{{ row.role }}</td>
          <td style="text-align: left">
            {{ row.worker }}
          </td>
          <td>{{ row.location }}</td>
          <!-- 开始 row.workStartTime -->
          <td>
            <!-- v-model="form.barTimeRange.end" -->
            <el-time-select
              v-model="row.workStartTime"
              start="08:00"
              end="18:00"
              step="00:15"
              format="H:mm"
            />
          </td>
          <!-- 终了 row.workEndTime -->
          <td>
            <el-time-select
              v-model="row.workEndTime"
              start="08:00"
              end="18:00"
              step="00:15"
              format="H:mm"
            />
          </td>
          <!-- 午休 row.lunchTime -->
          <td>
            <el-time-select
              v-model="row.lunchTime"
              start="08:00"
              end="18:00"
              step="00:15"
              format="H:mm"
              @change="timeChangeHandler(row.id, 'lunchTime', $event)"
            />
          </td>
          <!-- 间休 row.breakTime -->
          <td>
            <el-time-select
              v-model="row.breakTime"
              start="08:00"
              end="18:00"
              step="00:15"
              format="H:mm"
              @change="timeChangeHandler(row.id, 'breakTime', $event)"
            />
          </td>
          <td>
            <el-checkbox v-model="row.isTarget"></el-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.info-table {
  &__table {
    border: 1px solid #ddd;
    border-collapse: collapse;
    table-layout: fixed;

    position: relative;

    td,
    th {
      height: 50px;
      font-size: 14px;
      color: #4C4C4C;
      border: none;
      // border: 1px solid #ddd;
      text-align: left;
      padding: 8px 12px;
    }

    .info-table__header {
      &.is-hide {
        display: none;
      }
    }

    .info-table__content {
      &-holiday {
        td {
          background-color: #C6C6C6;
        }
      }

      td {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        &.is-hide {
          display: none;
        }
      }
      td:last-child {
        border-left: 1px solid #ddd;
        text-align: center;
      }
    }
  }
}
</style>
