// 用来判断几级联动过滤, n^k: 确保相加的结果 不会在 [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024] 数组中
export const calcLevelNum = {
  workClass1: 1,
  workClass2: 2,
  workClass3: 4,
  workClass4: 8,
  workClass5: 16,
  workClass6: 32,
  workPlaceClass2: 64,
  workPlaceClass3: 128,
  workPlaceClass4: 256,
  workPlaceClass5: 512,
  workPlaceClass6: 1024,
}

Object.freeze(calcLevelNum)

// export const LevelEnum = {
//   CLASS_LEVEL_1: 1,
//   CLASS_LEVEL_2: 3,
//   CLASS_LEVEL_3: 7,
//   CLASS_LEVEL_4: 15,
//   CLASS_LEVEL_5: 31,
//   CLASS_LEVEL_6: 63,

//   PLACE_LEVEL_1: 64,
//   PLACE_LEVEL_2: 192,
//   PLACE_LEVEL_3: 448,
//   PLACE_LEVEL_4: 960,
//   PLACE_LEVEL_5: 1984,

//   PLACE_LEVEL_1_CLASS_LEVEL_1: 65,
//   PLACE_LEVEL_12_CLASS_LEVEL_23: 195
// }

// Object.freeze(LevelEnum)


/* 
  Class: level1: 1
  Class: level2: 1 + 2 = 3
  Class: level3: 1 + 2 + 4 = 7
  Class: level4: 1 + 2 + 4 + 8 = 15
  Class: level5: 1 + 2 + 4 + 8 + 16 = 31
  Class: level6: 1 + 2 + 4 + 8 + 16 + 32 = 63

  Place: level1: 64
  Place: level2: 64 + 128 = 192
  Place: level3: 64 + 128 + 256 = 448
  Place: level4: 64 + 128 + 256 + 512 = 960
  Place: level5: 128 + 256 + 512 + 1024 + 2048 = 1984
*/

/*
  options: {
    level: 标识着哪种过滤组合,
    kvs: 页面已选择的下拉框的值
  }
  fieldName: 下拉框的类别
  fieldVal: 下拉框的选项
  target: 盛放过滤的结果
  source: 数据源
*/
export const pulldownDispatcher = (options) => {
  let {level} = options

  // level判断几级联动的
  let levelMapping = {
    1: processClassLevel1,
    3: processClassLevel2,
    7: processClassLevel3,
    15: processClassLevel4,
    31: processClassLevel5,
    63: processClassLevel6,
    64: processPlaceLevel1,
    192: processPlaceLevel2,
    448: processPlaceLevel3,
    960: processPlaceLevel4,
    1984: processPlaceLevel5,

    65: processClassPlaceLevel1,
    195: processClassPlaceLevel2
  }

  levelMapping[level] && levelMapping[level](options)
}


// 处理 作业场所2
function processPlaceLevel1(options) {

  let {kvs, target, source} = options
  let {fieldName, fieldVal} = kvs[0]

  const schemeHandler = {
    0: () => {
      const filterTargets = [
        "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
        "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {
          target[key] = getElByRange(1, source[key])
        }
      }
    },
    1: () => {
      const filterTargets = [
        "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
        "workClass2", "workClass5"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {

          const mapping = {
            workClass5: () => (target[key] = getElByRange("^3", source[key]))
          }
          
          mapping[key]
            ? mapping[key]()
            : target[key] = getElByRange("^2", source[key])
        }
      }
    },
    2: () => {
      const filterTargets = [
        "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", 
        "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {

          const mapping = {
            workPlaceClass3: () => (target[key] = getElByRange(2, source[key])),
            workClass1: () => (target[key] = getElByRange("$2", source[key]))
          }
          
          mapping[key]
            ? mapping[key]()
            : target[key] = getElByRange(">1", source[key])
        }
      }
    },
  }

  const filterConditions = source[fieldName].map((item, index) => {
    return [
      item, schemeHandler[index]
    ]
  })

  const result = filterConditions.find(([key, handler]) => (fieldVal == key))
  result && result[1]()
}

/*
  "source": {
    "workPlaceClass2": [
      "場所2-1",
      "場所2-2",
      "場所2-3"
    ],
  }
*/
  /*
  [
    {
      "workPlaceClass2": [
        "場所2-1",
        "場所2-2",
        "場所2-3"
      ]
    },
    {
      "workPlaceClass3": [
        "場所3-1",
        "場所3-2",
        "場所3-3"
      ]
    }
  ]
  */

// 处理 作业场所2 + 作业场所3
function processPlaceLevel2(options) {

  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)
  // console.log("combinations:", JSON.stringify(combinations, null, 2))

  const schemeHandler = [
    [
      combinations[0],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[1],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workClass1)/,
                () => (target[key] = getElByRange(2, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[2],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workClass1)/,
                () => (target[key] = getElByRange("end", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[3],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = {
              workPlaceClass2: () => target[key] = getElByRange(2, source[key]),
              workClass1: () => target[key] = getElByRange("1|3", source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[4],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)|(workClass3)|(workClass4)|(workClass6)/,
                () => {
                  target[key] = getElByRange(">1", source[key])
                }
              ],
              [
                /(workClass5)/,
                () => {
                  target[key] = getElByRange("2~3", source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[7],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = {
              workPlaceClass2: () => target[key] = getElByRange("end", source[key]),
              workPlaceClass3: () => target[key] = getElByRange(2, source[key]),
              workClass1: () => target[key] = getElByRange(">2", source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()
}


// 处理 作业场所2 + 作业场所3 + 作业场所4
function processPlaceLevel3(options) {
  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)

  const schemeHandler = [
    [
      combinations[0],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[3],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workClass1)/,
                () => (target[key] = getElByRange(2, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[6],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange("end", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[13],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass3)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ],
              [
                /(workClass5)/,
                () => (target[key] = getElByRange("2|3", source[key]))
              ],
              [
                /(workClass1)|(workClass4)|(workClass6)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[22],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ],
              [
                /(workClass3)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ],
              [
                /(workPlaceClass6)|(workClass4)|(workClass5)|(workClass6)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[23],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workPlaceClass5)|(workPlaceClass6)|(workClass2)|(workClass3)|(workClass5)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("end", source[key])
          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()
}

function processPlaceLevel4(options) {

}

function processPlaceLevel5(options) {

}



// 处理: 作业分类1
function processClassLevel1(options) {

  let {kvs, target, source} = options
  let {fieldName, fieldVal} = kvs[0]

  const schemeHandler = {
    0: () => {
      let filterTargets = [
        "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
        "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {
          const mapping = {
            workPlaceClass2: () => (target[key] = getElByRange("^2", source[key]))
          }
          
          mapping[key]
            ? mapping[key]()
            : target[key] = getElByRange(1, source[key])
        }
      }
    },
    1: () => {
      let filterTargets = [
        "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
        "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {

          const mapping = {
            workClass1: () => (target[key] = getElByRange(2, source[key]))
          }
          
          mapping[key]
            ? mapping[key]()
            : target[key] = getElByRange("^2", source[key])
        }
      }
    },
    2: () => {
      const filterTargets = [
        "workPlaceClass4", "workPlaceClass5", 
        "workClass1", "workClass2"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {

          let mapping = new Map([
            [
              /(workClass1)/,
              () => (target[key] = getElByRange(3, source[key]))
            ]
          ])

          let result = [...mapping].find(([k, v]) => k.test(key))
          result
            ? result[1]()
            : target[key] = getElByRange("^2", source[key])
        }
      }
    },
    3: () => {
      const filterTargets = [
        "workClass1"
      ]

      for(const key in source) {
        if(filterTargets.includes(key)) {
          target[key] = getElByRange("end", source[key])
        }
      }
    }
  }

  const filterConditions = source[fieldName].map((item, index) => {
    return [
      item, schemeHandler[index]
    ]
  })

  const result = filterConditions.find(([key, handler]) => (fieldVal == key))
  result && result[1]()

}


// 处理: 作业分类1 + 作业分类2
function processClassLevel2(options) {
  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)

  const schemeHandler = [
    [
      combinations[0],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => (target[key] = getElByRange("^2", source[key]))
              ]
            ])
  
            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[3],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange("^2", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(2, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[4],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[6],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => (target[key] = getElByRange("^2", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[7],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)|(workClass2)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange(3, source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
    [
      combinations[9],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => {
                  target[key] = getElByRange("1|3", source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[10],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workPlaceClass5)|(workClass2)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass1)|(workClass3)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
    [
      combinations[11],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass3)|(workClass5)/,
                () => {
                  target[key] = getElByRange("$2", source[key])
                }
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("end", source[key])

          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()

}


// 处理: 作业分类1 + 作业分类2 + 作业分类3
function processClassLevel3(options) {

  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)

  const schemeHandler = [
    [
      combinations[22],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])

          }
        }
      }
    ],
    [
      combinations[23],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ],
              [
                /(workClass3)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workClass4)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
    [
      combinations[32],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workPlaceClass5)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass1)|(workClass3)/,
                () => (target[key] = getElByRange("end", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
    [
      combinations[34],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workClass3)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass5)/,
                () => (target[key] = getElByRange(3, source[key]))
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("end", source[key])
          }
        }
      }
    ],
    [
      combinations[35],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass5)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("end", source[key])
          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()

}


// 处理: 作业分类1 + 作业分类2 + 作业分类3 + 作业分类4
function processClassLevel4(options) {

  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)
  console.log(combinations)

  const schemeHandler = [
    [
      combinations[94],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)|(workClass3)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workClass1)|(workClass3)|(workClass4)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])

          }
        }
      }
    ],
    [
      combinations[95],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ],
              [
                /(workClass3)|(workClass4)/,
                () => (target[key] = getElByRange("end", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("$2", source[key])
          }
        }
      }
    ]
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()

}

function processClassLevel5(options) {

}

function processClassLevel6(options) {

}


// 处理: 作业分类1 + 作业场所2
function processClassPlaceLevel1(options) {

  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)
  console.log(combinations)

  const schemeHandler = [
    [
      combinations[0],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[3],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange("^2", source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[6],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[9],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange("1|3", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[1],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[4],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[7],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass4", "workClass5"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange(3, source[key])
                }
              ],
              [
                /(workClass4)/,
                () => {
                  target[key] = getElByRange("-3", source[key])
                }
              ],
              [
                /(workClass5)/,
                () => {
                  target[key] = getElByRange("^3", source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("^2", source[key])
          }
        }
      }
    ],
    [
      combinations[10],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)|(workClass3)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workClass4)/,
                () => {
                  target[key] = getElByRange("2|3", source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      combinations[8],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workClass2)|(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange(3, source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ],
    [
      combinations[11],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workPlaceClass3)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass1)|(workClass4)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("$2", source[key])
          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()

}


// 处理: 作业分类1 + 作业分类2 + 作业场所1 + 作业场所2
function processClassPlaceLevel2(options) {

  let {kvs, target, source} = options
  let arrs = kvs.map(item => source[item.fieldName])
  let vals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const combinations = combineArrays(arrs)
  console.log(combinations)

  const schemeHandler = [
    [
      combinations[0],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[27],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(2, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[54],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      combinations[81],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange("end", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])

          }
        }
      }
    ],
    [
      combinations[57],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(1, source[key])

          }
        }
      }
    ],
    [
      combinations[67],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ],
              [
                /(workClass3)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ],
              [
                /(workClass4)/,
                () => (target[key] = getElByRange("2|4", source[key]))
              ],
              [
                /(workClass5)/,
                () => (target[key] = getElByRange("2|3", source[key]))
              ],
              [
                /(workClass6)/,
                () => (target[key] = getElByRange(">1", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])

          }
        }
      }
    ],
    [
      combinations[94],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workClass1)|(workClass3)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workClass4)/,
                () => (target[key] = getElByRange("2|3", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(2, source[key])

          }
        }
      }
    ],
    [
      combinations[70],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass1)/,
                () => (target[key] = getElByRange(3, source[key]))
              ],
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange(">1", source[key])

          }
        }
      }
    ],
    [
      combinations[97],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workClass3)|(workClass4)|(workClass1)|(workClass3)|(workClass4)/,
                () => (target[key] = getElByRange("end", source[key]))
              ],
              [
                /(workPlaceClass3)|(workPlaceClass5)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("$2", source[key])

          }
        }
      }
    ],
    [
      combinations[106],
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            
            let mapping = new Map([
              [
                /(workPlaceClass3)/,
                () => (target[key] = getElByRange(2, source[key]))
              ],
              [
                /(workClass3)|(workClass5)/,
                () => (target[key] = getElByRange("$2", source[key]))
              ]
            ])

            let result = [...mapping].find(([k, v]) => k.test(key))
            result
              ? result[1]()
              : target[key] = getElByRange("end", source[key])

          }
        }
      }
    ],
  ]

  const result = schemeHandler.find(([condition, handler]) => checkEl(condition, vals))
  result && result[1]()
}















// ++++++ Utils ++++++

// 根据和值 求数组中元素的下标
function findIndexes(arr, target) {
  const results = []
  const len = arr.length

  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path])
      return
    }

    for (let i = start; i < len; i++) {
      const num = arr[i]

      if (sum + num > target) {
        break
      }

      path.push(i)
      backtrack(i + 1, sum + num, path)
      path.pop()
    }
  }

  backtrack(0, 0, [])

  return results // [[下标1, 下标2]]
}


// 根据和值返回 相加结果的元素
function findElements(arr, target) {
  const results = []
  const len = arr.length
  
  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path])
      return
    }
  
    for (let i = start; i < len; i++) {
      const num = arr[i]
  
      if (sum + num > target) {
        break
      }
  
      path.push(i)
      backtrack(i + 1, sum + num, path)
      path.pop()
    }
  }
  
  backtrack(0, 0, [])
  
  return results.map((indexes) => indexes.map((index) => arr[index])) // [[元素1, 元素2]]
}

/*
  [1,2,3,4,5,6,7,8]
  使用方法1: 5 -> [5]
  使用方法2: 3~5 -> [3,4,5]
  使用方法3: >5 -> [6,7,8]
  使用方法4: <5 -> [1,2,3,4]
  使用方法5: end -> [8]
  使用方法6: ^3 -> [1,2,3]
  使用方法7: $3 -> [6,7,8]
*/
export const getElByRange = (param, source) => {
  if(typeof param == "number") {
    let index = param - 1
    return [source[index]]
  }

  const conditions = [
    [
      {type: "string", val: "~"},
      () => {
        let [begin, end] = param.split("~")
        begin--
        return source.slice(begin, end)
      }
    ],
    [
      {type: "string", val: ">"},
      () => {
        let reg = /(?<=\>)\d+/g
        let index = param.match(reg)[0]
        return source.slice(index)
      }
    ],
    [
      {type: "string", val: "<"},
      () => {
        let reg = /(?<=\<)\d+/g
        let index = param.match(reg)[0]
        index--
        return source.slice(0, index)
      }
    ],
    [
      {type: "string", val: "|"},
      () => {
        let indexs = param.split("|")
        let begin = indexs[0] - 1
        let end = indexs[1] - 1
        return [source[begin], source[end]]
      }
    ],
    [
      {type: "string", val: "end"},
      () => {
        return source.slice(source.length - 1)
      }
    ],
    [
      {type: "string", val: "$"},
      () => {
        let reg = /(?<=\$)\d+/g
        let index = param.match(reg)[0]
        return source.slice(source.length - index)
      }
    ],
    [
      {type: "string", val: "^"},
      () => {
        let reg = /(?<=\^)\d+/g
        let index = param.match(reg)[0]
        return source.slice(0, index++)
      }
    ],
    [
      {type: "string", val: "-"},
      () => {
        let reg = /(?<=\-)\d+/g
        let index = param.match(reg)[0]
        let temp = JSON.parse(JSON.stringify(source))
        temp.splice(--index, 1)
        return temp
      }
    ],
    [
      {type: "string", val: "all"},
      () => {
        return source.slice()
      }
    ]
  ]

  const result = conditions.find(([condition, handler]) => (condition.type == typeof param) && (param.indexOf(condition.val) != -1))
  if(result) return result[1]()
}


// 全ての組み合わせを取得する関数
function combineArrays(arrays) {
  let result = []
  if (!arrays || arrays.length === 0) {
    return result
  }

  const length = arrays.length
  const maxIndex = length - 1

  const indices = new Array(length).fill(0)

  while (true) {
    const currentResult = []
    for (let i = 0; i < length; i++) {
      currentResult.push(arrays[i][indices[i]])
    }
    result.push(currentResult)

    let indexToIncrement = maxIndex
    while (indexToIncrement >= 0 &&
      indices[indexToIncrement] === arrays[indexToIncrement].length - 1) {
      indexToIncrement--
    }

    if (indexToIncrement < 0) {
      break
    }

    indices[indexToIncrement]++
    for (let i = indexToIncrement + 1; i < length; i++) {
      indices[i] = 0
    }
  }
  return result
}

function checkEl(arr1, arr2) {
  return arr1.every((item, index) => item == arr2[index])
}


