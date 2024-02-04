<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  computed
} from 'vue'

import Konva from 'konva'

import type {
  infoItemType,
  workTimeItemType,
  recordItemType
} from '@/types/schedule/api'

import type { validationItemType, dataFormType } from '@/types/schedule/screen'

import { GANTT_INFO } from '../utils/constant'
import { deepClone } from '@/utils/util'

defineOptions({
  name: 'GanttBar'
})

const instance = getCurrentInstance()

type propsType = {
  initTimeRange: string[],
  stageTotalWidth: number,
  selector: string,
  record: infoItemType & { [_: string]: any },
  validationMapping: validationItemType
}

const props = withDefaults(defineProps<propsType>(), {})

const validationMapping = computed(() => props.validationMapping)

const canvasRef = ref()

// 关联Bar的数据: 存放 id 和 records
// todo: 是否需要将coreTime, 如果它能调节的话应该加入, 如果是固定的话 就不要
const dataForm = reactive<dataFormType>({
  id: props.record.id,
  // records: { ...markRaw(props.record.records) }
  records: props.record.records
})
// 是 dataForm 的备份
const dataFormBackUp: dataFormType = {
  id: props.record.id,
  records: {}
}

// 获取所有Bar的key
const allBarsKey = computed(() => {
  return Object.keys(props.record.records)
})

const notAllowBars = ['coreTime', 'shortBreak', 'break']

// 根据 itemNo 更新 dataForm 中的值
const updateDataForm = (key: string, timeRange: workTimeItemType): void => {
  const [itemNo, nameKey] = key.split(':')
  const arr = dataForm.records[nameKey]
  const target = arr.find((item: recordItemType) => item.itemNo === +itemNo)
  if (target) {
    target.workTimeRange = timeRange
  }
}

const lastPos = reactive<Record<string, number>>({
  x1: 0,
  x2: 0
})

const onceFlag = ref<boolean>(false)

// stage
const stage = ref<Konva.Stage>()
// layer
const layer = ref<Konva.Layer>()

// 创建变换器 tr
const tr = ref<Konva.Transformer>()

// stage width
// let stageWidth = ref(0)
// time and position mapping { 8:00: 20 }
type timePosMappingType = Record<string, number> & { [_: string]: any }
const timePosMapping = reactive<timePosMappingType>({})
// {8:00: 0, 8:15: 20, ...}
const posMappings = reactive<number[]>([])
// [0,20, ...]

// ----- methods ------
// 获取 time 和 x 的映射关系: init方法里面开始位置开始调用的
const getTimePosMapping = (): void => {
  const pos: number[] = []
  for (let i = 0; i <= props.stageTotalWidth; i += GANTT_INFO.MIN_STEP) {
    pos.push(i)
    posMappings.push(i)
  }

  props.initTimeRange.forEach((time: string, index: number) => {
    timePosMapping[time] = pos[index]
  })
}

// 根据 bar 的起始位置 和 结束位置 返回bar所属的时间段
const getTimeOfBar = (x1: number, x2: number): workTimeItemType => {
  const startTimeIndex = x1 / GANTT_INFO.MIN_STEP
  const endTimeIndex = x2 / GANTT_INFO.MIN_STEP

  const start = Object.keys(timePosMapping)[startTimeIndex]
  const end = Object.keys(timePosMapping)[endTimeIndex]

  return {
    start,
    end
  }
}

// 获取bar的宽度
// const startTime = '8:00'
// const endTime = '10:00'
const getBarWidth = (startTime: string, endTime: string): number => {
  return timePosMapping[endTime] - timePosMapping[startTime]
}

const bgColorMapping = {
  procurement: '#0089E5',
  multipleRelay: '#04c618',
  shortBreak: '#c6c6c6',
  break: '#c6c6c6',
  storage: '#194b6c',
  coreTime: '#F34C4C'
}

// 图形的基础配置
const barConfig = reactive<Konva.NodeConfig>({
  width: 0,
  height: 0,
  x: 0,
  y: 0
})

const barTextConfig = reactive<Konva.NodeConfig>({
  fontSize: 12,
  fontFamily:
    '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "sans-serif"',
  fill: '#010101',
  fontStyle: 'bold',
  align: 'left',
  verticalAlign: 'top',
  padding: 5,
  // 超过显示省略号
  ellipsis: true,
  wrap: 'none'
})

const coreTimeConfig = reactive<Konva.NodeConfig>({
  width: 0,
  height: 8,
  x: 0,
  y: 36
})

// BarText 宽度的初始值
type barTextWidthsType = {
  [_: number]: number
}
const barTextWidths = ref<barTextWidthsType>({})

const findNearestValue = (target: number, array: number[]): number => {
  return array.reduce((prev, curr) =>
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  )
}

const groups = ref<Konva.Group[]>([])

const init = (): void => {
  if (Object.keys(props.record.records).length === 0) return
  barTextWidths.value = {}
  groups.value = []

  // 获取画布DOM的高宽, 根据此数据创建stage
  const { clientWidth, clientHeight } = canvasRef.value

  // 创建 stage
  stage.value = new Konva.Stage({
    container: '.' + props.selector,
    width: clientWidth,
    height: clientHeight
  })

  // 给 stage 的宽度 进行赋值
  // stageWidth.value = stage.value.width()
  // 获取 时间 和 位置 的 映射
  getTimePosMapping()

  // 创建 layer
  layer.value = new Konva.Layer()

  // transformer: 拖动改变Bar的宽度时候的控制器 下面我们配置了bar的最小宽度
  tr.value = new Konva.Transformer({
    centeredScaling: false,
    enabledAnchors: ['middle-left', 'middle-right'],
    // enabledAnchors: ['middle-right'],
    boundBoxFunc(oldBox, newBox) {
      if (newBox.width < GANTT_INFO.BAR_MIN_WIDTH) {
        return oldBox
      }
      const thisBar = tr.value?.nodes()[0]
      const thisGroup = thisBar?.getParent() as Konva.Group

      const index = groups.value.findIndex(
        (group: Konva.Group) => group._id === thisGroup?._id
      ) as number

      const prevGroup: Konva.Group = index > 0 ? groups.value[index - 1] : null
      const nextGroup: Konva.Group =
        index < groups.value.length - 1 ? groups.value[index + 1] : null

      const newLeft = newBox.x
      const newRight = newBox.x + newBox.width

      if (!prevGroup) {
        // 说明bar在首位

        // 处理左侧超出边界 newLeft 是新的边界位置，如果它小于 0，意味着矩形超出了舞台的左边缘。
        if (newLeft < 0) {
          // 将矩形的左侧边界设置为 0，确保它不会超出舞台左边界。
          newBox.x = 0
          // 由于矩形的左侧被拉到了舞台的左边缘，矩形的宽度需要相应调整。
          // 这里的计算是基于原来的宽度（oldBox.width）减去原来左侧边界距离舞台左边缘的距离（oldBox.x）可以保持矩形的右侧边界不变，而将左侧边界拉到舞台的左边缘。
          newBox.width = oldBox.width - oldBox.x
        }

        // 处理右侧不超过下一个矩形的左侧位置
        const nextGroupX = nextGroup ? nextGroup.x() : stage.value.width() // 如果没有下一个组，使用舞台的宽度

        // nextGroupX 是下一个矩形的左侧位置 。如果当前矩形的新右侧边界 超过了 矩形的左侧位置
        if (newRight > nextGroupX) {
          // newBox.x 是当前变换的矩形的左侧边界的 x 坐标
          // nextGroupX - newBox.x，结果是当前矩形可以扩展到的最大宽度
          newBox.width = nextGroupX - newBox.x
        }
      } else if (!nextGroup) {
        // 说明bar在末尾

        // 确保矩形不会超出舞台的右侧边界，以及不会超过前一个矩形的右侧边界。
        const maxWidth = stage.value.width()
        if (newRight > maxWidth) {
          // 用于保持矩形的左侧边界位置不变
          newBox.x = oldBox.x

          // 重新计算并设置矩形的宽度，使其不会超出舞台的右侧边界。
          // 从舞台的最大宽度（maxWidth）中减去矩形原左侧边界位置（oldBox.x）。这样做的结果是矩形的右侧边界会正好位于舞台的右侧边界，同时保持左侧边界位置不变。
          newBox.width = maxWidth - oldBox.x
        }

        // 处理左侧不超过前一个矩形的右侧位置
        const prevBar = prevGroup.getChildren(
          (node: Konva.Node) => node.getClassName() === 'Rect'
        )[0] as Konva.Rect

        // prevGroupX: 前一个矩形组（prevGroup）的右侧边界的 x 坐标
        const prevGroupX = prevGroup ? prevGroup.x() + prevBar.width() : 0 // 如果没有前一个组，使用0

        // 当前矩形的左侧边界（newLeft）是否位于前一个矩形的右侧边界（prevGroupX）的左侧。如果是这样，意味着当前矩形的左侧边界正在“侵入”前一个矩形的区域。
        if (newLeft < prevGroupX) {
          // 将当前矩形的左侧边界调整为与前一个矩形的右侧边界对齐
          newBox.x = prevGroupX

          // 如果调整后的newBox.x与newBox.width的右边界位置重叠，保持newBox.width不变
          // 用来确保在调整左侧边界后，当前矩形的宽度不会因为左侧边界的移动而变得过小。如果新的左侧边界（newBox.x）加上当前的宽度（newBox.width）仍然超过了前一个矩形的右侧边界（prevGroupX），那么就将当前矩形的宽度重置为原始宽度（oldBox.width），以避免矩形变形。
          if (newBox.x + newBox.width > prevGroupX) {
            newBox.width = oldBox.width
          }
        }
      } else {
        // 说明bar在中间

        const prevBar = prevGroup.getChildren(
          (node: Konva.Node) => node.getClassName() === 'Rect'
        )[0]

        if (newLeft < prevGroup.x() + prevBar.width()) {
          // 如果左侧碰到前一个组的右侧，限制为前一个组的右侧
          // 在调整左侧边界后，这行代码重新计算当前矩形的宽度。这是通过取原始矩形（oldBox）的右侧边界位置（oldBox.x + oldBox.width）减去新的左侧边界位置（newBox.x）来实现的。
          // 这样做确保了当前矩形的右侧边界保持不变，而只是左侧边界进行了调整
          newBox.x = prevGroup.x() + prevBar.width()
          newBox.width = oldBox.x + oldBox.width - newBox.x
        }

        // 检查当前矩形的右侧边界（newRight）是否位于后一个矩形组（nextGroup）的左侧边界
        if (newRight > nextGroup.x()) {
          // 如果右侧碰到后一个组的左侧，限制为后一个组的左侧
          // 调整当前矩形的宽度，使其右侧边界与后一个矩形的左侧边界对齐。具体做法是，从后一个矩形的左侧边界位置（nextGroup.x()）减去当前矩形的左侧边界位置（newBox.x），得到新的宽度值。
          newBox.width = nextGroup.x() - newBox.x
        }
      }

      return newBox
    }
  })

  // ---
  for (const key in props.record.records) {
    const rows = props.record.records[key]
    const bgColor = bgColorMapping[key]

    for (const item of rows) {
      const x = timePosMapping[item.workTimeRange.start as string]

      const w = getBarWidth(
        item.workTimeRange.start as string,
        item.workTimeRange.end as string
      )
      const title = item.title
      const nameKey = `${item.itemNo as number}:${item.nameKey as string}`

      // 如果有coreTime的话 创建 coreTime, 不想让移动的放在这里
      if (key === 'coreTime') {
        const coreTimeInfo = {
          width: w,
          x,
          fill: bgColor,
          name: nameKey
        }
        Object.assign(coreTimeConfig, coreTimeInfo)
        const coreTimeBar = new Konva.Rect(coreTimeConfig)
        layer.value.add(coreTimeBar)
      } else {
        // 想让移动的在这

        // 创建 Bar 元素
        const barInfo = {
          width: w,
          height: 30,
          fill: bgColor,
          name: nameKey
        }

        Object.assign(barConfig, barInfo)
        // 创建 Bar
        const bar = new Konva.Rect(barConfig)

        // 创建文本节点
        const barTextInfo = {
          // x: 10,
          // y: 5,
          text: title
        }
        Object.assign(barTextConfig, barTextInfo)
        const barText = new Konva.Text(barTextConfig)

        const barTextBgInfo = {
          width: barText.width(),
          height: barText.height(),
          fill: title ? '#fff' : 'transparent'
        }

        const barTextBg = new Konva.Rect(barTextBgInfo)

        // 将 文字 和 其背景添加到group中
        const textGroup = new Konva.Group({
          x: 5,
          y: (bar.height() - barText.height()) / 2
        })

        textGroup.add(barTextBg, barText)

        // todo: BarText 宽度的初始值 包含padding的宽度
        barTextWidths.value[barText._id] = barText.width()

        const group = new Konva.Group()
        const groupConfig: Konva.NodeConfig = {
          x,
          y: 0,
          draggable: !notAllowBars.includes(item.nameKey),

          // 拖着bar进行移动 对移动的bar做边界处理
          dragBoundFunc(pos) {
            const rect = (this as Konva.Group).getChildren((node) => {
              return node.getClassName() === 'Rect'
            })[0]

            // 计算最近的 X 坐标 当前位置 (20px单位)
            const nearestX =
              Math.round(pos.x / GANTT_INFO.MIN_STEP) * GANTT_INFO.MIN_STEP

            // 确保不会超出边界
            const _x = Math.max(
              0,
              Math.min(
                stage.value.width() - rect.width(),
                nearestX
              )
            )

            return {
              x: _x,
              y: this.absolutePosition().y
            }
          }
        }
        group.setAttrs(groupConfig)

        // 这个api应该也可以吧 怎么用的????
        // group.dragDistance(20)
        group.add(bar)
        group.add(textGroup)

        // 拖拽开始 和 结束的处理回调
        group.on('dragstart', function (e) {
          const rectLeft = this.x()
          const rectRight = rectLeft + bar.width()

          // 找到离左侧位置最近的数组中的值
          const x1 = findNearestValue(rectLeft, posMappings)

          // 找到离右侧位置最近的数组中的值
          const x2 = findNearestValue(rectRight, posMappings)

          // x2 的位置可能是有问题, 但是没有使用它
          const pos = {
            x1,
            x2
          }

          Object.assign(lastPos, pos)

          // 当dragstart的时候 我们将它所占的位置修改为false
          const startIndex = posMappings.findIndex((x: number) => x === x1)
          const endIndex = posMappings.findIndex((x: number) => x === x2)

          for (let i = startIndex; i < endIndex; i++) {
            validationMapping.value.calcForLength[i] = false
          }

          // 备份移动前的数据
          if (!onceFlag.value) {
            // const backupBarData = JSON.parse(JSON.stringify(dataForm))
            Object.assign(dataFormBackUp, deepClone(dataForm))

            onceFlag.value = false
          }
        })

        group.on('dragend', function () {
          // 派发事件 更新 Bar 的相关数据
          const rectLeft = this.x()
          const rectRight = rectLeft + bar.width()
          // 问题: bar.x() 是基于父元素的相对位置, group 是它的父元素, bar.x() 的 4 7

          // 找到离左侧位置最近的数组中的值
          const nearestLeft = findNearestValue(rectLeft, posMappings)

          // 找到离右侧位置最近的数组中的值
          const nearestRight = findNearestValue(rectRight, posMappings)

          // 1. 获取到放下bar的时候x1的位置
          const droppedX = this.x()
          const barWidth = bar.width()

          // 2. 根据该获取获取在 posMapping 中的index
          // index index2 === x1 x2
          const index = posMappings.findIndex((x: number) => x === droppedX)
          const index2 = posMappings.findIndex((x: number) => x === droppedX + barWidth)

          // 3. 从 index 位置遍历 validationMapping.calcForLength 数组, 统计 index位置后 false 的数量
          let count = 0
          for (
            let i = index;
            i < validationMapping.value.calcForLength.length;
            i++
          ) {
            const flag = validationMapping.value.calcForLength[i]
            if (!flag) {
              count++
            } else {
              break
            }
          }

          // 4. 计算出 能容纳下的宽度
          const permissibleWidth = count * GANTT_INFO.MIN_STEP

          // 5. 当放下的时候 能容纳下的宽度 是否大于 Bar的宽度 如果不可以则回到上一次的位置
          if (
            validationMapping.value.calcForLength[index] ||
            validationMapping.value.calcForLength[index2 - 1]
          ) {
            // 1. 回到原来的位置
            this.setAttrs({
              x: lastPos.x1
            })
            // 2. 使用备份数据 更新dataForm
            Object.assign(dataForm, dataFormBackUp)
            // 派发原来位置的数据
            instance?.proxy?.$bus.emit('eventUpdateBarData', dataForm)
          } else if (permissibleWidth < barWidth) {
            // 1. 回到原来的位置
            this.setAttrs({
              x: lastPos.x1
            })
            // 2. 使用备份数据 更新dataForm
            Object.assign(dataForm, dataFormBackUp)
            // 派发原来位置的数据
            instance?.proxy?.$bus.emit('eventUpdateBarData', dataForm)
            // isMoveSuccessed.value = false
          } else {
            const workTimeRange = getTimeOfBar(nearestLeft, nearestRight)

            updateDataForm(bar.name(), workTimeRange)
            // 移动成功
            // isMoveSuccessed.value = true
            // 1. 派发事件更新数据
            instance?.proxy?.$bus.emit('eventUpdateBarData', dataForm)
            // 2. 更新备份数据
            // const backupBarData = JSON.parse(JSON.stringify(dataForm))
            Object.assign(dataFormBackUp, deepClone(dataForm))
          }
          // 要处理标识数据
          // Object.assign(lastPos, { x1: 0, x2: 0 })
        })

        // 区分 双击事件还是单击事件
        let clickTimeout

        // group的点击事件
        group.on('click', function (e: Konva.KonvaEventObject<any>) {
          if (clickTimeout) {
            // 如果定时器已经存在，说明这是双击的一部分，所以不处理单击事件
            clearTimeout(clickTimeout)
            clickTimeout = null
          } else {
            // 设置定时器以检测是否是单击
            clickTimeout = setTimeout(() => {
              // 处理单击事件
              const thisBar = this.getChildren(
                (node: Konva.Node) => node.getClassName() === 'Rect'
              )[0]

              const [itemNo, nameKey] = thisBar.name().split(':')
              const params = {
                id: props.record.id,
                itemNo: +itemNo,
                nameKey
              }

              // 给父组件派发事件 保存点击的Bar的相关信息
              instance?.proxy?.$bus.emit('eventUpdateCurrentTargetInfo', params)

              clickTimeout = null
            }, 250)// 250 毫秒内如果没有第二次点击，则视为单击
          }
        })

        group.on('dblclick', function (e: Konva.KonvaEventObject<any>) {
          if (clickTimeout) {
            clearTimeout(clickTimeout)
            clickTimeout = null
          }
          e.evt.preventDefault()
          e.evt.stopPropagation()
          e.cancelBubble = true
          // 点击是bar的时候 才做处理 其它目标直接return
          if (e.currentTarget.getClassName() !== 'Group' || e.currentTarget.getClassName() === 'Stage') {
            return
          }

          this.draggable(false)
          const thisBar = this.getChildren(
            (node: Konva.Node) => node.getClassName() === 'Rect'
          )[0]

          const [itemNo, nameKey] = thisBar.name().split(':')

          instance?.proxy?.$bus.emit('eventOpenShiftPanel', {
            type: 'update',
            id: props.record.id,
            itemNo: +itemNo,
            nameKey
          })

          // 处理逻辑结束后让该group可以拖动
          this.draggable(true)
        })
        groups.value?.push(group)
        groups.value.sort((a: any, b: any) => a.attrs.x - b.attrs.x)
        layer.value.add(group)
      }
    }
  }
  // ---

  layer.value.add(tr.value)
  stage.value.add(layer.value)

  // 我们在拖拽缩放Bar的时候 需要保证tr内部元素的宽度 让它等于我们tr调整后的宽度, 我们给 tr 绑定transform事件
  tr.value.on('transform', function (e: Konva.KonvaEventObject<any>) {
    const thisGroup = e.target.getParent() as Konva.Group
    // [Rect, Group]
    const thisBar = thisGroup.getChildren(
      (node) => node.getClassName() === 'Rect'
    )[0]
    const thisTextGroup = thisGroup.getChildren(
      (node) => node.getClassName() === 'Group'
    )[0] as Konva.Group
    const thisBarText = thisTextGroup.getChildren(
      (node) => node.getClassName() === 'Text'
    )[0] as Konva.Text
    const thisBarTextBg = thisTextGroup.getChildren(
      (node) => node.getClassName() === 'Rect'
    )[0]
    const textInitWidth = barTextWidths.value[thisBarText._id]

    const currentWidth = e.currentTarget.width()
    const nearestWidth =
      Math.round(currentWidth / GANTT_INFO.MIN_STEP) * GANTT_INFO.MIN_STEP

    // 在移动bar的时候 实时更新bar的宽度为tr的宽度
    // 更新bar的宽度
    thisBar.setAttrs({
      // width: nearestWidth,
      width: e.currentTarget.width(),

      scaleX: 1,
      scaleY: 1
    })

    // 更新 textGroup 的位置, 保持 5px 的位置
    thisTextGroup.setAttrs({
      x: thisBar.x() + 5
    })

    thisBarText.setAttrs({
      width: nearestWidth < textInitWidth ? nearestWidth : textInitWidth,

      scaleX: 1,
      scaleY: 1
      // x: thisBar.x() + 5
    })

    thisBarTextBg.setAttrs({
      width: nearestWidth < textInitWidth ? nearestWidth : textInitWidth,

      scaleX: 1,
      scaleY: 1
      // x: thisBar.x() + 5
    })

    // 使用 tr 改变rect的宽度 实际上宽度并没有变化 变化的是scale, 所以一个元素的宽度应该是 rect.width() * rect.scaleX()
    // const width = rect.width() * rect.scaleX()
    // const roundedWidth = Math.round(width / 20) * 20
    // if (roundedWidth !== 0) {
    //   rect.scaleX(roundedWidth / rect.width())
    // }

    layer.value?.batchDraw()
  })

  tr.value.on('transformend', function (e: Konva.KonvaEventObject<any>) {
    const thisGroup = e.target.getParent() as Konva.Group

    const thisBar = thisGroup.getChildren(
      (node) => node.getClassName() === 'Rect'
    )[0]

    const thisTextGroup = thisGroup.getChildren(
      (node) => node.getClassName() === 'Group'
    )[0] as Konva.Group

    const thisBarText = thisTextGroup.getChildren(
      (node) => node.getClassName() === 'Text'
    )[0] as Konva.Text

    const thisBarTextBg = thisTextGroup.getChildren(
      (node) => node.getClassName() === 'Rect'
    )[0]

    // 获取矩形左侧和右侧位置
    // const rectLeft = bar.x()  // 这是相对于父元素的位置
    const rectLeft = thisBar.getAbsolutePosition().x
    const rectRight = rectLeft + thisBar.width()
    // 问题: bar.x() 是基于父元素的相对位置, group 是它的父元素, bar.x() 的 4 7

    // 找到离左侧位置最近的数组中的值
    const nearestLeft = findNearestValue(rectLeft, posMappings)

    // 找到离右侧位置最近的数组中的值
    const nearestRight = findNearestValue(rectRight, posMappings)

    // 根据bar的x1 和 x2 更新bar的时间范围
    const workTimeRange = getTimeOfBar(nearestLeft, nearestRight)
    updateDataForm(thisBar.name(), workTimeRange)

    // 更新完bar的时间范围后 要重新计算
    instance?.proxy?.$bus.emit('eventUpdateBarData', dataForm)

    // const backupBarData = JSON.parse(JSON.stringify(dataForm))
    Object.assign(dataFormBackUp, deepClone(dataForm))

    // 调整矩形的位置和宽度
    thisBar.setAttrs({
      // x: nearestLeft,
      x: 0,
      width: nearestRight - nearestLeft,
      scaleX: 1,
      scaleY: 1
    })

    thisGroup?.setAttrs({
      x: nearestLeft
    })

    thisTextGroup.setAttrs({
      x: 5
    })
    // here
    // e.currentTarget.setAttrs({
    //   x: nearestLeft,
    //   width: nearestRight - nearestLeft
    // })

    // 更新文本等其他元素的位置
    thisBarText.setAttrs({
      scaleX: 1,
      scaleY: 1
    })

    thisBarTextBg.setAttrs({
      scaleX: 1,
      scaleY: 1
    })
  })

  stage.value.on('click tap', (e: Konva.KonvaEventObject<any>) => {
    const dom = e.target
    //  && ids.includes(dom._id)
    if (dom.getType() === 'Shape') {
      const thisBar = dom.getParent()?.getChildren((node: Konva.Node) => {
        return node.getClassName() === 'Rect'
      })[0]

      // 不想让coreTime加入到tr, 这里利用coreTime的颜色值进行判断 但是要求这个颜色值必须唯一
      const nameKey = (thisBar as Konva.Rect).name().split(':')[1]

      if (
        !allBarsKey.value.includes(nameKey) ||
        notAllowBars.includes(nameKey)
      ) {
        return
      }

      // 断言
      tr.value?.nodes([thisBar])
    } else {
      // 单击stage的时候 将保存的 当前Bar信息 初始化
      instance?.proxy?.$bus.emit('eventResetCurrentTargetInfo')
      tr.value?.nodes([])
    }
  })

  // 双击舞台的时候发送事件: todo 我们双击bar的时候也会打开
  stage.value.on('dblclick', (e: Konva.KonvaEventObject<any>) => {
    if (e.currentTarget.getClassName() === 'Stage') {
      instance?.proxy?.$bus.emit('eventOpenShiftPanel', {
        type: 'add',
        id: props.record.id
      })
    }
  })
}

const redraw = (id: string): void => {
  if (props.record.id === id) {
    // 暴力一点, 当我们修改数据后, 删除 追加图形时, 直接init() 就会根据数据进行重新渲染
    init()
  }
}

const canvasClickHandler = (e: MouseEvent): void => {
  if (e.target.nodeName === 'DIV') {
    // 我们点击的是 div 所以应该是 新规 追加 的逻辑
    instance?.proxy?.$bus.emit('eventOpenShiftPanel', {
      type: 'add',
      id: props.record.id
    })
  }
}

// ----- lifecycle ------
onMounted(() => {
  init()
  instance?.proxy?.$bus.on('eventReDraw', redraw)
})
</script>

<template>
  <div class="gantt-bar ctn-fill">
    <!-- 画布 -->
    <div
      ref="canvasRef"
      class="canvas ctn-fill"
      :class="selector"
      @dblclick="canvasClickHandler"
    >
    </div>
  </div>
</template>

<style scoped lang="scss">
.gantt-bar {
  .canvas {
    // border: 1px solid #333;
  }
}
</style>
