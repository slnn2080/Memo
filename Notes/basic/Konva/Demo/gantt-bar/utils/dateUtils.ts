import Dayjs from 'dayjs'

export function dateStrToDate(timeStr: string): Date {
  const today = Dayjs().format('YYYY-MM-DD')
  const date = `${today} ${timeStr}`

  return Dayjs(date).toDate()
}

export function diffDateToStep(date1: Date, date2: Date): number {
  const startTime = Dayjs(date1)
  const endTime = Dayjs(date2)

  return endTime.diff(startTime, 'minute') / 15
}

export function convertFormatToStr(
  dateObj: string | Date,
  forma: string
): string {
  return Dayjs(dateObj).format(forma)
}

export function addTime(timeStr: string, hoursToAdd: number, minutesToAdd: number = 0): string {
  // 使用 dayjs 解析时间字符串
  const time = Dayjs(timeStr, 'HH:mm')

  // 添加小时和分钟
  const newTime = time.add(hoursToAdd, 'hour').add(minutesToAdd, 'minute')

  // 返回格式化的新时间字符串
  return newTime.format('H:mm')
}
