<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import type { headrType, validationMappingResType } from '@/types/schedule/screen'
import type { infoItemType, timeRangeType } from '@/types/schedule/api'

import { generateTimeIntervals } from '../utils/util'
import { TIME_INTERVAL, GANTT_TABLE } from '../utils/constant'

import GanttBar from './GanttBar.vue'

defineOptions({
  name: 'ScheduleTable'
})

type propsType = {
  list: infoItemType[],
  headers: headrType[],
  timeLevel: string,
  timeRange: timeRangeType,
  timeCells: number[],
  initTimeRange: string[],
  scheduleTableWidth: number,
  validationMapping: validationMappingResType
}

const props = withDefaults(defineProps<propsType>(), {
  list: () => [],
  headers: () => [],
  timeLevel: 'minutes',
  timeRange: () => ({
    start: 0,
    end: 0
  }),
  timeCells: () => [],
  initTimeRange: () => [],
  scheduleTableWidth: 0,
  validationMapping: () => ({})
})

// 计算右表的宽度 = 表格的外层容器(可变) - 左表的宽度
// const tableWidth = computed(
//   () => String(props.containerWidth - props.infoTableWidth) + 'px'
// )

// // Hour组成的数组 [8 ~ 20]
// const timeCells = computed(() => {
//   const arr = []
//   for (let i = props.timeRange.start; i < props.timeRange.end; i++) {
//     arr.push(i)
//   }
//   return arr
// })

// enum INTERVAL_MAPPING {
//   MINUTES = 15
// }

const stageTotalWidth = computed(() => {
  const hour = props.timeRange.end - props.timeRange.start
  return hour * GANTT_TABLE.CELL_WIDTH
})

// 全范围的时间数组: 根据服务器设定好的 TimeRange 获取每隔15分钟的 时间数组
// initTimeRange: ["8:00", "8:15", "...", "20:00"]
const personalTimeRange = reactive<Record<string, string[]>>({})
watch(props.list, (n: infoItemType[]) => {
  if (n.length > 0) {
    const result: Record<string, string[]> = {}

    props.list.forEach((record: infoItemType) => {
      if (!result[record.id]) {
        result[record.id] = []
      }

      if (!record.workStartTime && !record.workEndTime) {
        result[record.id].push(...props.initTimeRange)
      } else {
        result[record.id].push(
          ...generateTimeIntervals(
            record.workStartTime,
            record.workEndTime,
            TIME_INTERVAL.MINUTES
          )
        )
      }
    })

    Object.assign(personalTimeRange, result)
    // console.log('personalTimeRange', personalTimeRange)
    // console.log(
    //   'cellBgMapping',
    //   cellBgMapping(initTimeRange, personalTimeRange[1])
    // )
  }
})

// 单元格背景用: 比较两个时间数组, 并组织成一个对象 { 8:00: false }
const cellBgMapping = (
  baseTimeRange: string[],
  personalTimeRange: string[],
  endTime: string = ''
): Record<string, boolean> => {
  const result = baseTimeRange.reduce(
    (result: Record<string, boolean>, time: string) => {
      // const key = time.padStart(2, '0')
      if (personalTimeRange?.length > 0) {
        result[time] = personalTimeRange.includes(time)
        return result
      }
      return {}
    },
    {}
  )
  if (endTime) {
    result[endTime] = false
  }
  return result
}

</script>

<template>
  <el-scrollbar>
    <div
      class="schedule-table"
      :style="{
        '--cellHeight': GANTT_TABLE.CELL_HEIGHT + 'px',
        '--cellWidth': GANTT_TABLE.CELL_WIDTH + 'px'
      }"
    >
      <table
        class="schedule-table__table"
        :style="{
          width: scheduleTableWidth + 'px'
        }"
      >
        <thead>
          <tr>
            <th
              v-for="(item, index) in headers"
              :key="index"
              class="schedule-table__header"
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
            v-for="(row, index) in list"
            :key="index"
            class="schedule-table__content"
          >
            <td
              v-for="(hour, i) in timeCells"
              :key="hour"
            >
              <div
                class="schedule-table__item-wrapper"
                :data-hour="hour"
                :data-index="i"
              >
                <template v-if="timeLevel === 'minutes'">
                  <div
                    v-for="n in 4"
                    :key="n"
                    class="schedule-table__item"
                    :class="{
                      'schedule-table--item-disabled': !cellBgMapping(
                        initTimeRange,
                        personalTimeRange[row.id],
                        row.workEndTime
                      )[
                        `${String(hour)}:${String((n - 1) * 15).padStart(
                          2,
                          '0'
                        )}`
                      ],
                      'schedule-table--item-holiday': row.workStartTime === '休み'
                    }"
                    :data-minutes="(n - 1) * 15"
                    :data-time="`${String(hour)}:${String(
                      (n - 1) * 15
                    ).padStart(2, '0')}`"
                  ></div>
                </template>
              </div>
            </td>
            <!-- 表格的外侧 相对于表格来说多出来一列 且没有宽度 -->
            <!-- <td ref="testTdRef" class="test-td">test</td> -->
          </tr>
        </tbody>
      </table>
      <!-- gantt chart area -->
      <div class="schedule-table__gantt-area">
        <div
          v-for="(row, index) in list"
          :key="row.id"
          class="schedule-table__gantt-item"
          :style="`top: calc(${index + 1} * var(--cellHeight))`"
        >
          <GanttBar
            :init-time-range="initTimeRange"
            :record="row"
            :stage-total-width="stageTotalWidth"
            :selector="`canvas-${index}`"
            :validation-mapping="validationMapping[+row.id]"
          />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.schedule-table {
  // scss中定义的单元格的宽度
  $cell-width: var(--cellWidth);
  // scss中定义的行的高度
  $cell-height: var(--cellHeight);

  position: relative;

  // gantt-chart
  &__gantt-item {
    width: calc($cell-width * 12);
    height: $cell-height;
    position: absolute;
    left: 0;
  }

  // table
  &__table {
    border: 1px solid #ddd;
    border-collapse: collapse;
    table-layout: fixed;

    position: relative;
    left: -1px;

    td,
    th {
      width: $cell-width;
      height: $cell-height;
      font-size: 14px;
      color: #333;
      border: 1px solid #ddd;
      text-align: center;
      padding: 8px 5px;
    }
  }

  td:has(.schedule-table__item-wrapper) {
    padding: 0px;
  }

  &__item-wrapper {
    display: flex;
    height: 100%;
  }
  &__item {
    flex: 1;
    border-right: 1px dotted #ddd;
    position: relative;

    &:last-child {
      border-right: none;
    }
  }

  // 画 bar 的区域
  &__bar-wrapper {
    position: absolute;
    top: 50px;
    // left: v-bind(tableMainWidth);

    td {
      height: $cell-height;
    }
  }

  &--item-disabled {
    background-color: #F3F3F3;
  }

  &--item-holiday {
    background-color: #C6C6C6;
  }
}
</style>
