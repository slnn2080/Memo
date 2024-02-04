import type { infoItemType } from '@/types/schedule/api'

import type {
  validationMappingResType,
  validationItemSelectableType,
  recordsType
} from '@/types/schedule/screen'

import { TIME_INTERVAL } from './constant'

/**
 * @desc 根据 每个用户的 startTime 和 endTime 获取属于用户的 每intervalMinutes时间间隔的数组
 * @param startTime e.g: 8 | '20:30'
 * @param endTime e.g: 8 | '20:30'
 * @param intervalMinutes e.g: 15
 * @return { String[] } ['8:00', '8:15', '8:30', ...]
 */
const generateTimeIntervals = (
  startTime: number | string,
  endTime: number | string,
  intervalMinutes: number
): string[] => {
  const result = []

  const start = _parseTime(startTime)
  const end = _parseTime(endTime)
  const intervalMilliseconds = intervalMinutes * 60 * 1000

  for (
    let time = start;
    // eslint-disable-next-line
    time <= end;
    time.setTime(time.getTime() + intervalMilliseconds)
  ) {
    const formattedHour = String(time.getHours())
    const formattedMinute = String(time.getMinutes()).padStart(2, '0')
    const timeString = `${formattedHour}:${formattedMinute}`

    result.push(timeString)
  }

  function _parseTime(time: number | string): Date {
    if (typeof time === 'number') {
      return new Date(`2000-01-01T${String(time).padStart(2, '0')}:00`)
    } else if (typeof time === 'string') {
      const [hours, minutes] = time.split(':')
      const paddedHours = hours.padStart(2, '0')

      return new Date(`2000-01-01T${paddedHours}:${minutes}`)
    } else {
      throw new Error('The time parameter can only be a number or string')
    }
  }

  return result
}

// 生成 个人的 时间数组
const personalTimeRangeWithJob = (
  startTime: string,
  endTime: string
): string[] => {
  const times = generateTimeIntervals(startTime, endTime, TIME_INTERVAL.MINUTES)
  // 把末尾时间去掉
  times.pop()
  return times
}

type getValidationMappingType = (
  list: infoItemType[],
  initTimeRange: string[]
) => validationMappingResType
const getValidationMapping: getValidationMappingType = (
  list,
  initTimeRange
) => {
  const res: validationMappingResType = {}

  const fullTimes: {
    [_: string]: boolean
  } = {}
  initTimeRange.forEach((time: string) => {
    fullTimes[time] = false
  })

  list.forEach((item) => {
    const record = item.records
    const _fullTimes = { ...fullTimes }

    const judgingResForMove: {
      [_: number]: Array<Record<string, boolean>>
    } = {}

    const judgingResForMove2: {
      [_: number]: string[]
    } = {}

    for (const key in record) {
      if (key !== 'coreTime') {
        const rows = record[key]

        for (const item of rows) {
          const personalTimes = personalTimeRangeWithJob(
            item.workTimeRange.start as string,
            item.workTimeRange.end as string
          )
          personalTimes.forEach((time) => {
            _fullTimes[time] = true

            // 更新 JudgingResOfMove
            const hour = time.split(':')[0]
            if (!judgingResForMove[+hour]) {
              judgingResForMove[+hour] = []
              judgingResForMove2[+hour] = []
            }
            judgingResForMove[+hour].push({ [key]: true })
            judgingResForMove2[+hour].push(key)
          })
        }
      }
    }

    // 获取属于同一小时的时间点
    const groupedByHour: {
      [_: number]: boolean[]
    } = {}
    initTimeRange.forEach((time: string) => {
      const hour = time.split(':')[0]
      if (!groupedByHour[+hour]) {
        groupedByHour[+hour] = []
      }
      groupedByHour[+hour].push(_fullTimes[time])
    })

    const vals = Object.values(_fullTimes)

    res[+item.id] = {
      personalFullTimes: _fullTimes,
      calcForLength: vals,
      JudgingResForHour: groupedByHour,
      JudgingResForMove: judgingResForMove,
      JudgingResForMove2: judgingResForMove2
    }
  })
  return res
}

// 之后有功夫跟上面的函数整合到一起吧 现在不想做哇哇哇哇
const getPersonalValidationMapping = (
  records: recordsType,
  initTimeRange: string[]
): validationItemSelectableType => {
  const res: validationItemSelectableType = {
    JudgingResForHour: {},
    JudgingResForMove: {},
    JudgingResForMove2: {},
    calcForLength: [],
    personalFullTimes: {}
  }

  const fullTimes: {
    [_: string]: boolean
  } = {}
  initTimeRange.forEach((time: string) => {
    fullTimes[time] = false
  })

  const _fullTimes = { ...fullTimes }

  const judgingResForMove: {
    [_: number]: Array<Record<string, boolean>>
  } = {}

  const judgingResForMove2: {
    [_: number]: string[]
  } = {}

  for (const key in records) {
    if (key !== 'coreTime') {
      const rows = records[key]

      for (const item of rows) {
        const personalTimes = personalTimeRangeWithJob(
          item.workTimeRange.start as string,
          item.workTimeRange.end as string
        )
        personalTimes.forEach((time) => {
          _fullTimes[time] = true

          // 更新 JudgingResOfMove
          const hour = time.split(':')[0]
          if (!judgingResForMove[+hour]) {
            judgingResForMove[+hour] = []
            judgingResForMove2[+hour] = []
          }
          judgingResForMove[+hour].push({ [key]: true })
          judgingResForMove2[+hour].push(key)
        })
      }
    }
  }

  // 获取属于同一小时的时间点
  const groupedByHour: {
    [_: number]: boolean[]
  } = {}
  initTimeRange.forEach((time: string) => {
    const hour = time.split(':')[0]
    if (!groupedByHour[+hour]) {
      groupedByHour[+hour] = []
    }
    groupedByHour[+hour].push(_fullTimes[time])
  })

  const vals = Object.values(_fullTimes)

  res.personalFullTimes = _fullTimes
  res.calcForLength = vals
  res.JudgingResForHour = groupedByHour
  res.JudgingResForMove = judgingResForMove
  res.JudgingResForMove2 = judgingResForMove2

  return res
}

export {
  generateTimeIntervals,
  getPersonalValidationMapping,
  getValidationMapping,
  personalTimeRangeWithJob
}
