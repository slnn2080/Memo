
type hoursItemType = {
  toBe: number,
  asls: number
}

type detailTableItemType = {
  project: string,
  area: string,
  total: {
    toBe: number,
    asls: number,
    class?: string
  },
  hours: hoursItemType[]
}
const detailTableData: detailTableItemType[] = [
  {
    project: '合計',
    area: '',
    total: { toBe: 580, asls: 572 },
    hours: [
      { toBe: 31, asls: 32 },
      { toBe: 15, asls: 15 },
      { toBe: 34, asls: 40 },
      { toBe: 27, asls: 25 },
      { toBe: 20, asls: 19 },
      { toBe: 44, asls: 46 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '入荷',
    area: 'メーカー仕入れ',
    total: { toBe: 232, asls: 234 },
    hours: [
      { toBe: 15, asls: 15 },
      { toBe: 33, asls: 33 },
      { toBe: 55, asls: 70 },
      { toBe: 24, asls: 22 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '入荷',
    area: '社内転送',
    total: { toBe: 14, asls: 12 },
    hours: [
      { toBe: 21, asls: 22 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '格納',
    area: 'BKT自動車倉庫',
    total: { toBe: 32, asls: 24 },
    hours: [
      { toBe: 30, asls: 36 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: 'ピック',
    area: 'BKT自動車倉庫',
    total: { toBe: 36, asls: 33 },
    hours: [
      { toBe: 25, asls: 20 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '格納',
    area: '2階',
    total: { toBe: 32, asls: 42 },
    hours: [
      { toBe: 18, asls: 20 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: 'ピック',
    area: '2階',
    total: { toBe: 69, asls: 68 },
    hours: [
      { toBe: 39, asls: 40 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '格納',
    area: '3階-A-E',
    total: { toBe: 43, asls: 39 },
    hours: [
      { toBe: 42, asls: 25 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: 'ピック',
    area: '3階-A-E',
    total: { toBe: 81, asls: 85 },
    hours: [
      { toBe: 34, asls: 34 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  },
  {
    project: '出荷',
    area: '単伝',
    total: { toBe: 41.5, asls: 35 },
    hours: [
      { toBe: 32, asls: 32 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 },
      { toBe: 0, asls: 0 }
    ]
  }
]

type headerItemType = {
  label: string,
  align: string,
  width: number
}
const detailTableHeaderData: headerItemType[] = []

const startTime = 8
const endTime = 20
const timeHeaders = []
for (let i = startTime; i <= endTime; i++) {
  const temp = {
    label: String(i) + '時',
    align: 'center',
    width: 60
  }

  timeHeaders.push(temp)
}

detailTableHeaderData.push(...timeHeaders)

export {
  detailTableData,
  detailTableHeaderData
}
