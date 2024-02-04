<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  getCurrentInstance
} from 'vue'

import type {
  infoItemType,
  timeRangeType,
  recordItemType
} from '@/types/schedule/api'

import type {
  headrType,
  validationMappingResType,
  dataFormType,
  currentTargetInfoType,
  kindItemType,
  barEditFormType
} from '@/types/schedule/screen'

import type { FormInstance } from 'element-plus'

import { GANTT_TABLE, TIME_INTERVAL, BARFORM_CATEGORY } from './utils/constant'

import { addTime } from './utils/dateUtils'
import { deepClone } from '@/utils/util'

// import { getInfos } from '@/api/schedule/api'
import scheduleData from './utils/scheduleData2'

import { detailTableData, detailTableHeaderData } from './utils/tableData'

import {
  generateTimeIntervals,
  getValidationMapping,
  getPersonalValidationMapping
} from './utils/util'

import AppExpandPanel from '@/components/AppExpandPanel.vue'
import ScheduleSearchArea from './components/ScheduleSearchArea.vue'
import InfoTable from './components/InfoTable.vue'
import ScheduleTable from './components/ScheduleTable.vue'

defineOptions({
  name: 'SchedulePage2'
})

// vue实例
const { proxy } = getCurrentInstance()

// 全局的 起始时间 和 结束时间 默认值为 8 - 20
const timeRange = reactive<timeRangeType>({
  start: 8,
  end: 20
})

// 单元格以什么作为区分, 小时 还是 分钟, 目前只完成了分钟的功能
const timeLevel = ref<string>('')

// 获取左右两表外围容器的宽度
const scheduleRef = ref()
const scheduleTableWrapperWidth = ref<number>()

// 左表的headers
const infoTableHeaders = ref<headrType[]>([
  { prop: 'role', label: '役割', align: 'center', width: 70 },
  { prop: 'worker', label: '作業者', align: 'center', width: 180 },
  { prop: 'location', label: '所属', align: 'center', width: 60 },
  { prop: 'workStartTime', label: '勤務開始', align: 'center', width: 130 },
  { prop: 'workEndTime', label: '勤務終了', align: 'center', width: 130 },
  { prop: 'lunchTime', label: '昼休み', align: 'center', width: 130 },
  { prop: 'breakTime', label: '休憩', align: 'center', width: 130 },
  { prop: 'isTarget', label: 'RA対象外', align: 'center', width: 60 }
])

// const infoTableHeadersBup = [
//   { prop: 'role', label: '役割', align: 'center', width: 70 },
//   { prop: 'worker', label: '作業者', align: 'center', width: 180 },
//   { prop: 'location', label: '所属', align: 'center', width: 60 },
//   { prop: 'workStartTime', label: '勤務開始', align: 'center', width: 130 },
//   { prop: 'workEndTime', label: '勤務終了', align: 'center', width: 130 },
//   { prop: 'lunchTime', label: '昼休み', align: 'center', width: 130 },
//   { prop: 'breakTime', label: '休憩', align: 'center', width: 130 },
//   { prop: 'isTarget', label: 'RA対象外', align: 'center', width: 60 }
// ]

// 切换折叠列的按钮标识
const showTableAttr = ref<boolean>(false)
// 标识当前是折叠还是展开
const isCollapsed = computed(() => {
  return showTableAttr.value === true
})

// const colunmName = ['勤務開始', '勤務終了', '昼休み', '休憩', 'RA対象外']

// watch(isCollapsed, (n) => {
//   if (n) {
//     infoTableHeaders.value = infoTableHeaders.value.filter(head => !colunmName.includes(head.label))
//   } else {
//     infoTableHeaders.value = infoTableHeadersBup
//   }
// })

/*
- validationMapping: 标识的对象: 每个工人都对应有这么一个对象
  - **JudgingResForHour**: 每小时为一个间隔的bool数组 [true,true,true,true]
  - **JudgingResForMove2**: 每小时为一个间隔的string数组 ["procurement","procurement","procurement","procurement"]
  - **calcForLength:**, 每15分钟的bool数组
  - personalFullTimes: 全时间范围内, 它的工作时间段为true, 其余为false
*/
const validationMapping = ref<validationMappingResType>({})

// 根据全局起始和结束时间 计算出右表的整点时间数组 [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
const timeCells = computed(() => {
  const arr = []
  for (let i = timeRange.start; i < timeRange.end; i++) {
    arr.push(i)
  }
  return arr
})

const scheduleTableWidth = computed(
  () => timeCells.value.length * GANTT_TABLE.CELL_WIDTH
)

// 左边表格的宽度
const infoTableWidth = computed(() => {
  // if (scheduleTableWrapperWidth.value) {
  //   return scheduleTableWrapperWidth.value - scheduleTableWidth.value
  // } else {
  //   return 0
  // }
  // 单纯的使用左表的各个单元格相加
  const w: number = infoTableHeaders.value.reduce((pre: number, cur: headrType) => (pre += cur.width as number), 0)
  return w + 1
})

// 右表的headers
const scheduleHeaders = reactive<headrType[]>([
  // { prop: 'operation', label: '操作', align: 'center', width: 60 }
])

// 加工 右表 headers
const processTimeLevel = (): void => {
  const { start, end } = toRefs(timeRange)
  const arr = []
  for (let i = start.value; i < end.value; i++) {
    const temp = {
      prop: 'time',
      label: `${i as number}時`,
      value: i,
      width: GANTT_TABLE.CELL_WIDTH,
      align: 'center'
    }

    arr.push(temp)
  }
  scheduleHeaders.splice(scheduleHeaders.length - 1, 0, ...arr)
}

// 表格数据
const tableData = reactive<infoItemType[]>([])

// 根据 全局 的 startTime 和 endTime 获取时间数组
const initTimeRange = reactive<string[]>([])

// 请求 - 初始化表格数据
const initTableList = async (): Promise<void> => {
  // const res = await getInfos()
  // 表格数组 list
  // tableData.length = 0
  // tableData.push(...res.data.list)

  // 加工 res.data.list
  scheduleData.list.forEach((item: infoItemType) => {
    const breakItem = {
      itemNo: 1,
      title: '休憩',
      nameKey: 'break',
      workTimeRange: {
        start: item.lunchTime,
        end: addTime(item.lunchTime, 1)
      }
    }

    const shortBreak = {
      itemNo: 1,
      title: '',
      nameKey: 'shortBreak',
      workTimeRange: {
        start: item.breakTime,
        end: addTime(item.breakTime, 0, 15)
      }
    }

    if (item.records.break && item.records.shortBreak) {
      item.records.break.push(breakItem)
      item.records.shortBreak.push(shortBreak)
    }
  })

  tableData.length = 0
  tableData.push(...scheduleData.list)

  Object.assign(timeRange, scheduleData.timeRange)
  timeLevel.value = scheduleData.timeLevel

  // 初始化一个全时间范围的 时间数组
  initTimeRange.length = 0
  initTimeRange.push(
    ...generateTimeIntervals(
      timeRange.start,
      timeRange.end,
      TIME_INTERVAL.MINUTES
    )
  )

  processTimeLevel()

  // 初始化, 时间间隔(15)时间数组
  // initFullTimes(initTimeRange)

  // 根据 个人的时间工作范围, 拿到fullTimes对象 时间 和 boolean 的映射 数组
  validationMapping.value = getValidationMapping(scheduleData.list as infoItemType[], initTimeRange)
}

// 右表修改完数据后, 更新 validationMapping
const updateBarDataHandler = (data: dataFormType): void => {
  const res = getPersonalValidationMapping(data.records, initTimeRange)

  if (data.id) {
    validationMapping.value[+data.id] = res
  }

  const target = tableData.find(item => item.id === data.id)
  target.records = data.records
}

// ----- 删除Bar的相关逻辑 -----
const currentTargetInfo = reactive<currentTargetInfoType>({
  id: '',
  nameKey: '',
  itemNo: -1
})

const updateCurrentTargetInfo = (params: currentTargetInfoType): void => {
  Object.assign(currentTargetInfo, params)
}

const resetCurrentTargetInfo = (): void => {
  Object.assign(currentTargetInfo, {
    id: '',
    nameKey: '',
    itemNo: -1
  })
}

const updateCurrentTargetInfoHandler = (params: currentTargetInfoType): void => {
  updateCurrentTargetInfo(params)
}

const resetupdateCurrentTargetInfoHandler = (): void => {
  resetCurrentTargetInfo()
}

const delBarCancelHandler = (): void => {
  proxy.$invoke.hide()
  // 这样的话 取消后 需要重新点击在bar 才可以再次的进行删除操作
  resetCurrentTargetInfo()
}

const delBarConfirmHandler = (): void => {
  const index = tableData.findIndex((data: infoItemType) => data.id === currentTargetInfo.id)

  const { itemNo, nameKey } = currentTargetInfo

  const barIndex = tableData[index].records[nameKey].findIndex((bar: recordItemType) => bar.itemNo === itemNo)
  tableData[index].records[nameKey].splice(barIndex, 1)

  // 1. 删除Bar对应的数据, 2. 通知GanttBar组件 更新图层
  proxy?.$bus.emit('eventReDraw', currentTargetInfo.id)
  proxy.$invoke.hide()
}

const delHandler = (e: KeyboardEvent): void => {
  const targetKey = ['Delete', 'Backspace']
  if (!targetKey.includes(e.code) || !currentTargetInfo.id) return undefined

  proxy.$invoke.show({
    title: '確認',
    content: 'シルトを削除します。\nよろしいですか？',
    cancelFn: delBarCancelHandler,
    confirmFn: delBarConfirmHandler
  })
}
// ----- 删除Bar的相关逻辑 -----

// ----- 追加 Bar 的相关逻辑 -----
// 下拉项数组
const kinds = reactive<kindItemType[]>([
  {
    label: 'メーカー仕入',
    value: 'procurement'
  },
  {
    label: '複伝',
    value: 'multipleRelay'
  },
  {
    label: '２階ピック',
    value: 'storage'
  }
])

// 追加 休息 和 间休 的bar
const addBreakBarHandler = (id: string, type: string, time: string): void => {
  const target = tableData.find((item: infoItemType) => item.id === id)
  if (!target) return undefined

  if (type === 'lunchTime') {
    const breakItem = {
      itemNo: 1,
      title: '休憩',
      nameKey: 'break',
      workTimeRange: {
        start: time,
        end: addTime(time, 1)
      }
    }
    target.records.break = []
    target.records.break.push(breakItem)
  } else if (type === 'breakTime') {
    const shortBreak = {
      itemNo: 1,
      title: '',
      nameKey: 'shortBreak',
      workTimeRange: {
        start: time,
        end: addTime(time, 0, 15)
      }
    }
    target.records.shortBreak = []
    target.records.shortBreak.push(shortBreak)
  }

  proxy?.$bus.emit('eventReDraw', id)
}

// 切换 shift 和 coreTime 绑定的值 默认值为 shift
const barFormCateGory = ref(1)

// 标识是shift表单 还是coreTime表单
const isShift = computed(() => barFormCateGory.value === BARFORM_CATEGORY.SHIFT)

// watch(isShift, (n: boolean) => {
//   if (!n) {
//     // 需要重置 coreTime 界面么
//   }
// })

const barEditFormRef = ref<FormInstance>()
const barEditForm = reactive<barEditFormType>({
  type: '',
  worker: '',
  currentItemNo: -1,
  currentNameKey: '',
  firstKind: '',
  secondKind: '',
  timeRange: {
    start: '',
    end: ''
  },
  coreTimeRange: {
    start: '',
    end: ''
  }
})

const barEditFormBackup = JSON.stringify(barEditForm)

// 移除校验结果
const resetFormValidationInfo = (): void => {
  barEditFormRef.value?.resetFields()
}

// 重置表单信息
const resetForm = (): void => {
  Object.assign(barEditForm, {
    type: '',
    id: '',
    worker: '',
    currentItemNo: -1,
    currentNameKey: '',
    firstKind: '',
    secondKind: '',
    timeRange: {
      start: '',
      end: ''
    },
    coreTimeRange: {
      start: '',
      end: ''
    }
  })
}

// eslint-disable-next-line
const resetCoreTimeRange = (): void => {
  Object.assing(barEditForm.coreTimeRange, {
    start: '',
    end: ''
  })
}

const getItemNo = (arr: any[]): number => {
  if (arr.length === 0) {
    return 1
  }

  return arr.length + 1
}

// 追加Bar信息的回调
// eslint-disable-next-line
const addBarProcess = (): void => {
  // 1. 根据 id 获取对应员工的信息
  const target = tableData.find((item: infoItemType) => item.id === barEditForm.id)

  // 2. 获取 bar数据对象需要的值
  const [nameKey, title] = barEditForm.secondKind.split(':')

  // 3. 对bar的数组 进行初始化
  if (nameKey && !target.records[nameKey]) {
    target.records[nameKey] = []
  }

  // 如果是 coreTime 的话, 对coreTime进行初始化
  if (!nameKey && !isShift.value) {
    target.records.coreTime = []
  }

  // 如果是Bar添加画面则, 整理Bar的相关数据
  if (isShift.value) {
    // 组织 bar 的相关数据格式
    const itemNo = getItemNo(target.records[nameKey])
    const temp = {
      itemNo,
      nameKey,
      title,
      workTimeRange: deepClone(barEditForm.timeRange)
    }

    target.records[nameKey].push(temp)

    // 更新 validationMapping
    const data = {
      id: barEditForm.id,
      records: target.records
    }
    updateBarDataHandler(data)

  // 组织 coreTime 的相关数据格式
  } else {
    const temp = {
      itemNo: 1,
      nameKey: 'coreTime',
      workTimeRange: deepClone(barEditForm.coreTimeRange)
    }

    if (target.records.coreTime.length === 0) {
      target.records.coreTime.push(temp)
    } else {
      target.records.coreTime = []
      target.records.coreTime.push(temp)
    }
  }
}

// 更新 Bar 信息的回调
// eslint-disable-next-line
const updBarProcess = (): void => {
  // 1. 根据 id 获取对应员工的信息
  const target = tableData.find((item: infoItemType) => item.id === barEditForm.id)

  // 2. 获取 bar数据对象需要的值
  const [nameKey, title] = barEditForm.secondKind.split(':')

  // 1. 获取到要修改的数据的位置
  // 2. 将该位置的数据删掉
  // 3. 根据新的 nameKey 查看 对应数组是否有初始化
  // 4. 如过没有 则创建对应nameKey数组的元素 添加到数组中
  // 5. 如果有 则获取顺序的itemNo, 创建数组元素 添加到数组中
  const index = target.records[barEditForm.currentNameKey].findIndex(item => item.itemNo === barEditForm.currentItemNo)
  target.records[barEditForm.currentNameKey].splice(index, 1)

  if (!target.records[nameKey]) {
    target.records[nameKey] = []
    const temp = {
      itemNo: 1,
      nameKey,
      title,
      workTimeRange: deepClone(barEditForm.timeRange)
    }
    target.records[nameKey].push(temp)
  } else if (target.records[nameKey] && target.records[nameKey].length > 0) {
    const itemNo = getItemNo(target.records[nameKey])
    const temp = {
      itemNo,
      nameKey,
      title,
      workTimeRange: deepClone(barEditForm.timeRange)
    }
    target.records[nameKey].push(temp)
  }

  // 更新 validationMapping
  const data = {
    id: barEditForm.id,
    records: target.records
  }
  updateBarDataHandler(data)

  barEditForm.currentItemNo = -1
  barEditForm.currentNameKey = ''
}

// 取消按钮的回调
const closePannelHandler = (): void => {
  // 1. 验证是否有输入内容
  if (barEditFormBackup === JSON.stringify(barEditForm)) {
    barEditVisible.value = false
  } else {
    proxy.$invoke.show({
      type: 'cancel',
      cancelFn: proxy.$invoke.hide,
      confirmFn: () => {
        barEditVisible.value = false
        proxy.$invoke.hide()
      }
    })
  }
}

// 保存按钮的回调
const saveOrUpdBarHandler = (): void => {
  if (!barEditForm.type) return undefined

  const handlerMapping = {
    add: addBarProcess,
    update: updBarProcess
  }

  handlerMapping[barEditForm.type]?.()

  // 通知 GanttBar 组件 绘制图形
  proxy?.$bus.emit('eventReDraw', barEditForm.id)

  // 关闭 对话框
  barEditVisible.value = false
}

// 打开对话框的回调
type paramType = {
  type: string,
  id: string,
  itemNo?: number,
  nameKey?: string
}
const openShiftPannelHandler = (param: paramType): void => {
  // 1. 移除验证结果
  resetFormValidationInfo()
  const target = tableData.find((item: infoItemType) => item.id === param.id)

  if (param.type === BARFORM_CATEGORY.ADD) {
    // 新规
    resetForm()
  } else {
    // 修改
    // 获取 Bar 的相关信息 进行回显
    const info: recordItemType = target.records[param.nameKey].find(item => item.itemNo === param.itemNo)
    barEditForm.timeRange.start = info.workTimeRange.start
    barEditForm.timeRange.end = info.workTimeRange.end
    barEditForm.firstKind = `${info.nameKey as string}:${info.title as string}`
    barEditForm.secondKind = `${info.nameKey as string}:${info.title as string}`
    barEditForm.currentItemNo = param.itemNo
    barEditForm.currentNameKey = param.nameKey
  }
  // 2. 只要打开对话框 就会将type 和 id保存到 barForm中
  barEditForm.type = param.type
  barEditForm.id = param.id
  barEditForm.worker = target.worker
  barEditVisible.value = true
  // 每次打开添加面板的时候 我们将界面调整为 添加Bar的界面
  barFormCateGory.value = 1
}

// ----- 追加 Bar 的相关逻辑 -----

onMounted(() => {
  initTableList()
  // 获取两表外层容器
  scheduleTableWrapperWidth.value = scheduleRef.value?.offsetWidth

  // 打开 Bar 追加 或 修改 对话框
  proxy?.$bus.on('eventOpenShiftPanel', openShiftPannelHandler)

  // 移动 拖拽 Bar 之后 更新 validation数据吧
  proxy?.$bus.on('eventUpdateBarData', updateBarDataHandler)

  // 重置 currentTargetInfo
  proxy?.$bus.on('eventResetCurrentTargetInfo', resetupdateCurrentTargetInfoHandler)

  // 点击 Bar 将Bar的数据传递到 父组件
  proxy?.$bus.on('eventUpdateCurrentTargetInfo', updateCurrentTargetInfoHandler)

  // 监听 按键 事件
  document.addEventListener('keydown', delHandler)
})

// eg code
const value1 = ref('')

const closeDialogHandler = (): void => {
  barEditVisible.value = false
}

// 曜日
const weeks = [
  { label: '月曜日', value: 'week1' },
  { label: '火曜日', value: 'week2' },
  { label: '水曜日', value: 'week3' },
  { label: '木曜日', value: 'week4' },
  { label: '金曜日', value: 'week5' }
]
const selectedWeek = ref('')

const barEditVisible = ref(false)

</script>

<template>
  <div class="schedule ctn pb:10">
    <AppExpandPanel title="勤怠マスター シフト込み曜日別用">
      <ScheduleSearchArea />
    </AppExpandPanel>
    <el-row class="schedule__caption">
      <el-col
        :span="24"
        :lg="12"
      >
        <div class="caption-detail">
          <div class="time">
            <div class="top mb:5 text:1 text:1--bold">
              適用日*
            </div>
            <div class="bottom">
              <el-date-picker
                v-model="value1"
                class="mr:5"
                type="date"
                placeholder="Pick a day"
                style="width: 150px"
              />
            </div>
          </div>
          <div class="time">
            <div class="top mb:5 text:1 text:1--bold">
              曜日*
            </div>
            <div class="bottom">
              <el-select
                v-model="selectedWeek"
                placeholder="Select"
                style="width: 150px"
              >
                <el-option
                  v-for="item in weeks"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="display-mode ml:8">
            <div class="top mb:5 text:1 text:1--bold">
              表示適用
            </div>
            <div class="bottom">
              <el-button
                round
                size="small"
                :class="{'is-current': !isCollapsed}"
                @click="showTableAttr = false"
              >
                すべて
              </el-button>

              <el-button
                round
                size="small"
                :class="{'is-current': isCollapsed}"
                @click="showTableAttr = true"
              >
                属性のみ
              </el-button>
            </div>
          </div>
          <div class="core-time ml:10">
            <div class="mb:2 text:1">
              <span class="core-bar"></span>
              <span
                class="ml:5 text:1 text:1--bold"
              >
                コアタイム
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="24"
        :lg="12"
      >
        <div class="caption-btn">
          <div>
            <el-button>工数確認反映</el-button>
            <el-button>曜日別必要要員数</el-button>
            <el-button>シミュレーション</el-button>
            <el-button>曜日コピー</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="container__table">
      <!-- ガントチャートテーブル -->
      <el-card
        class="table-timeline"
        shadow="never"
        style="border: none; border-radius: 0px;"
        body-style="padding: 0;"
      >
        <div
          ref="scheduleRef"
          class="schedule__table-wrapper"
        >
          <InfoTable
            :table-width="infoTableWidth"
            :headers="infoTableHeaders"
            :list="tableData"
            :is-collapsed="isCollapsed"
            @add-break-bar-event="addBreakBarHandler"
          />
          <ScheduleTable
            :init-time-range="initTimeRange"
            :time-cells="timeCells"
            :schedule-table-width="scheduleTableWidth"
            :headers="scheduleHeaders"
            :time-level="timeLevel"
            :time-range="timeRange"
            :list="tableData"
            :validation-mapping="validationMapping"
          />
        </div>
      </el-card>

      <!-- 工数確認テーブル -->
      <el-card
        class="table-hours mt:10"
        shadow="never"
        style="border: none; border-radius: 0px;"
        body-style="padding: 0"
      >
        <el-table
          :data="detailTableData"
          style="width: 100%"
        >
          <el-table-column
            label="工程"
            width="70"
            fixed
            prop="project"
          />
          <el-table-column
            label="エリア"
            width="140"
            fixed
            prop="area"
          />
          <el-table-column
            label="合計"
            align="center"
            fixed
          >
            <el-table-column
              label="ToBe"
              width="90"
              align="center"
            >
              <template #default="{ row }">
                <span>{{ row.total.toBe }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Asls"
              width="90"
              align="center"
            >
              <template #default="{ row }">
                <span>{{ row.total.asls }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-for="(item, index) of detailTableHeaderData"
            :key="index"
            :label="item.label"
            align="center"
          >
            <el-table-column
              label="ToBe"
              width="90"
              align="center"
            >
              <template #default="{ row }">
                <span>{{ row.total.toBe }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Asls"
              width="90"
              align="center"
            >
              <template #default="{ row }">
                <span>{{ row.total.asls }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- シフト入力ブロック -->
      <div
        v-if="barEditVisible"
        class="input-schedule"
      >
        <div class="input-schedule__header">
          <h3>シフト選択</h3>
          <div>{{ barEditForm.worker }}</div>

          <el-button
            class="input-schedule__header__btn"
            @click="closeDialogHandler"
          >
            閉じる
          </el-button>
        </div>
        <div class="input-schedule__content">
          <el-form
            ref="barEditFormRef"
            class="schedule__form"
            label-position="top"
            :model="barEditForm"
          >
            <el-radio-group
              v-model="barFormCateGory"
            >
              <el-radio :label="1">
                シフト
              </el-radio>
              <el-radio :label="2">
                コアタイム
              </el-radio>
            </el-radio-group>

            <template v-if="isShift">
              <el-form-item
                label="作業開始日時"
                prop="timeRange"
              >
                <!-- bar的时间带 format="H:mm" -->
                <div class="schedule__time-picker">
                  <el-time-select
                    v-model="barEditForm.timeRange.start"
                    :disabled="barEditForm.type === BARFORM_CATEGORY.UPDATE"
                    start="08:00"
                    end="18:00"
                    step="00:15"
                    placeholder="Start Time"
                    format="H:mm"
                  />
                </div>
              </el-form-item>

              <el-form-item
                label="作業終了日時"
                prop="timeRange"
              >
                <!-- bar的时间带 format="H:mm" -->
                <div class="schedule__time-picker">
                  <el-time-select
                    v-model="barEditForm.timeRange.end"
                    :disabled="barEditForm.type === BARFORM_CATEGORY.UPDATE"
                    start="08:00"
                    end="18:00"
                    step="00:15"
                    placeholder="End Time"
                    format="H:mm"
                  />
                </div>
              </el-form-item>

              <el-form-item
                label="大項目"
                prop="firstKind"
              >
                <!-- bar的种类 -->
                <el-select v-model="barEditForm.firstKind">
                  <el-option
                    v-for="(item, index) in kinds"
                    :key="index"
                    :label="item.label"
                    :value="`${item.value}:${item.label}`"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="小項目"
                prop="secondKind"
              >
                <!-- bar的种类 -->
                <el-select v-model="barEditForm.secondKind">
                  <el-option
                    v-for="(item, index) in kinds"
                    :key="index"
                    :label="item.label"
                    :value="`${item.value}:${item.label}`"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item
                label="作業開始日時"
                prop="timeRange"
              >
                <!-- bar的时间带 format="H:mm" -->
                <div class="schedule__time-picker">
                  <el-time-select
                    v-model="barEditForm.coreTimeRange.start"
                    start="08:00"
                    end="18:00"
                    step="00:15"
                    placeholder="Start Time"
                    format="H:mm"
                  />
                </div>
              </el-form-item>

              <el-form-item
                label="作業終了日時"
                prop="timeRange"
              >
                <!-- bar的时间带 format="H:mm" -->
                <div class="schedule__time-picker">
                  <el-time-select
                    v-model="barEditForm.coreTimeRange.end"
                    start="08:00"
                    end="18:00"
                    step="00:15"
                    placeholder="End Time"
                    format="H:mm"
                  />
                </div>
              </el-form-item>
            </template>
            <div class="input-schedule__content__footer">
              <el-button
                @click="closePannelHandler"
              >
                キャンセル
              </el-button>
              <el-button
                type="primary"
                @click="saveOrUpdBarHandler"
              >
                保存
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/foundation/_variable' as val;

.schedule {
  &__caption {
    margin: 30px 0px 10px 0px;
    display: flex;
    align-items: center;

    .caption-detail {
      display: flex;
      // height: 56px;

      .top {
        height: 20px;
      }
      .bottom {
        height: 32px;
        // flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }

      .time {
        display: flex;
        flex-direction: column;
      }
      .attr, .core-time {
        display: flex;
        align-items: flex-end;
      }

      .attr {
        div {
          color: #337ecc;
        }
      }

      .core-time {
        // flex: 1;
        div {
          // width: 100%;
          display: flex;
          align-items: center;
        }
        .core-bar {
          display: block;
          width: 60px;
          height: 8px;
          background-color: #F34C4C;
          position: relative;
        }
      }

      .display-mode {
        font-weight: bold;

        .el-button {
          font-size: 14px;
          font-weight: bold;

          --el-button-text-color: #006BB3;
          --el-button-border-color: transparent;
          --el-button-bg-color: transparent;

          --el-button-hover-text-color: #FFF;
          --el-button-hover-bg-color: #006BB3;
          --el-button-hover-border-color: #006BB3;

          --el-button-active-text-color: #FFF;
          --el-button-active-bg-color: #006BB3;
          --el-button-active-border-color: #006BB3;

          + .el-button {
            margin-left: 8px;
          }
          &.is-current {
            --el-button-text-color: #FFF;
            --el-button-bg-color: #006BB3;
          }

          &.is-unselect {

          }
        }
      }
    }
    .caption-btn {
      display: flex;
      justify-content: end;
      align-items: flex-end;
      height: 56px;
    }

    .caption-wrapper {
      flex: 1;

      display: flex;

      .caption-day {
      }
      .caption-coreitime {
        display: flex;
        align-items: center;

        &__wrapper {
          display: flex;
          align-items: center;

          .core-bar {
            display: block;
            width: 60px;
            height: 2px;
            background-color: #c5c5c5;

            position: relative;

            &::before, &::after {
              content: '';
              display: block;
              position: absolute;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #c5c5c5;
            }

            &::before {
              left: 0px;
              top: 50%;
              transform: translateY(-50%);
            }

            &::after {
              right: 0px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
    .caption-btn {
      flex: 1;

      display: flex;
      justify-content: end;
    }
  }
  &__time-picker {
    display: flex;
  }
  &__table-wrapper {
    display: flex;
  }

  &__time-picker {
    display: flex;
  }
  &__operation {
    width: 100%;
    display: flex;
    justify-content: end;
    position: relative;

    &::before {
      content: '';
      display: block;
      border-top: 1px dotted #ddd;
      width: 100%;
      position: absolute;
      top: -20px;
      left: 0px;
    }
  }
  &__display-area {
    // margin-top: 30px;
    // margin-bottom: 20px;
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      display: block;
      border-top: 1px dotted #ddd;
      width: 100%;
      position: absolute;
      left: 0px;
      top: -16px;
    }

    .title {
      color: val.$text-secondary;
    }
  }

  &__display-item {
    // height: 30px;
    width: 100%;
    position: relative;

    & + .schedule__display-item {
      margin-top: 10px;
    }
  }
}

.sheet-select {

  &__header {
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__user {
    h3 {
      font-size: 14px;
      margin-top: 0px;
      margin-bottom: 10px;
    }

    div {
      font-size: 12px;
      margin-bottom: 20px;
    }
  }

  &__btn {}
  &__content {
    h4 {
      margin: 0px 0px 10px;
    }
  }
}

.container__table {
  overflow: hidden;
  position: relative;

  .input-schedule {
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    padding: 16px;
    background-color: #FFF;
    box-shadow: 0px 0px 15px -3px #303030;
    z-index: 10;

    &__header {
      position: relative;
      padding-right: 90px;
      margin: 0 0 16px;

      h3 {
        font-size: 16px;
        margin: 0 0 4px;
      }
      > div {
        font-size: 12px;
        font-weight: bold;
        color: #888888;
      }

      &__btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    &__content {
      .el-form {
        .el-radio-group {
          display: flex;
          width: calc(100% + 28px);
          margin: 0 -14px 16px;

          .el-radio {
            width: 50%;
            margin: 0;
            padding: 12px 16px;
            background-color: #B2E0FF;
            font-weight: bold;
            color: #002945;

            &.is-checked {
              background-color: #D5EDFD;
            }
          }
        }

        .el-form-item {
          font-weight: bold;

          .schedule__time-picker {
            width: 100%;
          }

          .el-select {
            width: 100%;
          }
        }
      }

      &__footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 32px;
      }
    }
  }
}

.table-hours {
  .el-table {
    --el-table-tr-bg-color: #FFF;
    --el-table-row-hover-bg-color: #FFF;
    --el-table-border-color: #DDD;
    font-weight: bold;

    :deep(.el-table__header) {
      thead.is-group {
        th.el-table__cell {
          padding: 5px 0 3px;
          background-color: #FFF;

          &:first-child {
            border-right: none;
          }
        }

        tr:first-child {
          th.el-table__cell {
            &:nth-child(3) {
              background-color: #E5F0F7;
            }
          }
        }

        tr:last-child {
          th.el-table__cell {
            padding: 0;
            font-size: 10px;

            &:first-child,
            &:nth-child(2) {
              background-color: #E5F0F7;
            }

            &:nth-child(2n+3) {
              border-right: none;
            }
          }
        }
      }
    }

    :deep(.el-table__body-wrapper) {

      .el-table__cell {
        padding: 10px 0;

        &:first-child {
          border-right: none;
        }

        &:nth-child(n+3) {
          font-size: 16px;
        }

        &:nth-child(3) {
          background-color: #BFDBED;
        }

        &:nth-child(4) {
          background-color: #E5F0F7;
        }

        &:nth-child(2n+5) {
          background-color: #F1F1F1;
        }

        // セル - 工数不足の場合の赤ハイライト
        &.is-under {
          color: #FFF;
          background-color: #A70000;
        }

        // セル - 工数超過の場合の青ハイライト
        &.is-over {
          color: #FFF;
          background-color: #006BB3;
        }
      }

      tr:first-child {
        .el-table__cell {
          background-color: #E5F0F7;

          &:nth-child(3) {
            background-color: #BFDBED;
          }

          &:nth-child(4) {
            background-color: #CEE3F0;
          }

          &:nth-child(2n+5) {
            background-color: #BFDBED;
          }
        }
      }
    }
  }
}

:deep(.el-dialog__body) {
  padding-top: 0px;
}
</style>
