export default {
  timeLevel: 'minutes',
  timeRange: {
    start: 8,
    end: 20
  },
  list: [
    {
      id: '1',
      role: '社員',
      worker: 'XXXXX: 社員A',
      location: 'ー',
      workStartTime: '9:00',
      workEndTime: '17:00',
      lunchTime: '12:00',
      breakTime: '15:00',
      isTarget: false,
      records: {
        procurement: [
          {
            itemNo: 1,
            title: 'メーカー仕入',
            nameKey: 'procurement',
            workTimeRange: { start: '9:00', end: '12:00' }
          }
          // {
          //   itemNo: 1,
          //   title: 'メーカー仕入',
          //   nameKey: 'procurement',
          //   workTimeRange: { start: '9:00', end: '11:00' },
          // }
        ],
        multipleRelay: [
          {
            itemNo: 1,
            title: '複伝',
            nameKey: 'multipleRelay',
            workTimeRange: { start: '13:00', end: '15:00' }
          },
          {
            itemNo: 2,
            title: '複伝',
            nameKey: 'multipleRelay',
            workTimeRange: { start: '15:15', end: '17:00' }
          }
        ],
        break: [
          // {
          //   itemNo: 1,
          //   title: '休憩',
          //   nameKey: 'break',
          //   workTimeRange: { start: '12:00', end: '12:45' }
          // }
        ],
        shortBreak: [
          // {
          //   itemNo: 1,
          //   title: '',
          //   nameKey: 'shortBreak',
          //   workTimeRange: { start: '15:00', end: '15:15' }
          // }
        ],
        coreTime: [
          {
            itemNo: 1,
            nameKey: 'coreTime',
            workTimeRange: { start: '9:00', end: '10:00' }
          }
        ]
      }
    },
    {
      id: '2',
      role: '社員',
      worker: 'XXXXX: 社員B',
      location: 'ー',
      workStartTime: '8:00',
      workEndTime: '17:00',
      lunchTime: '12:00',
      breakTime: '15:00',
      isTarget: true,
      records: {
        // 仕入れ
        procurement: [
          {
            itemNo: 1,
            nameKey: 'procurement',
            title: 'メーカー仕入',
            workTimeRange: { start: '8:00', end: '12:00' }
          }
        ],
        storage: [
          {
            itemNo: 1,
            nameKey: 'storage',
            title: '２階ピック',
            workTimeRange: { start: '13:00', end: '15:00' }
          },
          {
            itemNo: 2,
            nameKey: 'storage',
            title: '２階ピック',
            workTimeRange: { start: '15:15', end: '17:00' }
          }
        ],
        break: [
          // {
          //   itemNo: 1,
          //   nameKey: 'break',
          //   title: '休憩',
          //   workTimeRange: { start: '12:30', end: '13:15' }
          // }
        ],
        shortBreak: [
          // {
          //   itemNo: 1,
          //   nameKey: 'shortBreak',
          //   title: '',
          //   workTimeRange: { start: '15:00', end: '15:15' }
          // }
        ]
      }
    },
    {
      id: '3',
      role: '社員',
      worker: 'XXXXX: 社員C',
      location: '入荷',
      workStartTime: '8:00',
      workEndTime: '17:00',
      lunchTime: '12:00',
      breakTime: '15:00',
      isTarget: false,
      records: {
        // 仕入れ
        procurement: [
          {
            itemNo: 1,
            nameKey: 'procurement',
            title: 'メーカー仕入',
            workTimeRange: { start: '8:00', end: '12:00' }
          },
          {
            itemNo: 2,
            nameKey: 'procurement',
            title: 'メーカー仕入',
            workTimeRange: { start: '13:00', end: '15:00' }
          }
        ],
        storage: [
          {
            itemNo: 1,
            nameKey: 'storage',
            title: '２階格納',
            workTimeRange: { start: '15:15', end: '17:00' }
          }
        ],
        break: [
          // {
          //   itemNo: 1,
          //   nameKey: 'break',
          //   title: '休憩',
          //   workTimeRange: { start: '12:00', end: '12:45' }
          // }
        ],
        shortBreak: [
          // {
          //   itemNo: 1,
          //   nameKey: 'shortBreak',
          //   title: '',
          //   workTimeRange: { start: '15:00', end: '15:15' }
          // }
        ]
      }
    },
    {
      id: '4',
      role: '社員',
      worker: 'XXXXX: 社員D',
      location: 'ー',
      workStartTime: '',
      workEndTime: '',
      lunchTime: '',
      breakTime: '',
      isTarget: false,
      records: {}
    }
  ]
}
