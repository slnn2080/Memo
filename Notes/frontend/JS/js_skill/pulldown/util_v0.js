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

  // 过滤条件 和 执行逻辑
  const filterConditions = [
    [
      {fn: "workPlaceClass2", fv: "場所2-1"},
      () => {

        let filterTargets = [
          "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
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
      {fn: "workPlaceClass2", fv: "場所2-2"},
      () => {

        let filterTargets = [
          "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", "workClass2", "workClass5"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {

            let mapping = {
              workClass5: () => target[key] = getElByRange("<4", source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange("1~2", source[key])
          }
        }
      }
    ],
    [
      {fn: "workPlaceClass2", fv: "場所2-3"},
      () => {
        let filterTargets = [
          "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", 
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = {
              workPlaceClass3: () => target[key] = getElByRange(2, source[key]),
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(">1", source[key])
          }
        }
      }
    ]
  ]

  // 找到符合的条件项并执行逻辑
  const result = filterConditions.find(([condition, handler]) => condition.fn == fieldName && condition.fv == fieldVal)
  result && result[1]()
}

// 处理 作业场所2 + 作业场所3
function processPlaceLevel2(options) {

  let {kvs, target, source} = options
  let selectedVals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])
  
  const filterConditions = [
    [
      {combinations: ["場所2-1", "場所3-1"]},
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
      {combinations: ["場所2-1", "場所3-2"]},
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
      {combinations: ["場所2-1", "場所3-3"]},
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
      {combinations: ["場所2-2", "場所3-1"]},
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
      {combinations: ["場所2-2", "場所3-2"]},
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
      {combinations: ["場所2-3", "場所3-2"]},
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
    ]
  ]
  const result = filterConditions.find(([condition, handler]) => condition.combinations.every((item, index) => (item == selectedVals[index])))
  result && result[1]()
}

function processPlaceLevel3(options) {

}

function processPlaceLevel4(options) {

}

function processPlaceLevel5(options) {

}



// 处理: 作业分类
function processClassLevel1(options) {
  console.log(1)
  let {kvs, target, source} = options
  let {fieldName, fieldVal} = kvs[0]

  // 过滤条件 和 执行逻辑
  const filterConditions = [
    [
      {fn: "workClass1", fv: "作業1-1"},
      () => {

        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", 
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = {
              workPlaceClass2: () => target[key] = getElByRange("1~2", source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      {fn: "workClass1", fv: "作業1-2"},
      () => {

        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", 
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange("1~2", source[key])
          }
        }
      }
    ],
    [
      {fn: "workClass1", fv: "作業1-3"},
      () => {

        let filterTargets = [
          "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", 
          "workClass2"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange("1~2", source[key])
          }
        }
      }
    ],
    [
      {fn: "workClass1", fv: "作業1-4"},
      () => {

        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6", 
          "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            target[key] = getElByRange("all", source[key])
          }
        }
      }
    ],
  ]

  // 找到符合的条件项并执行逻辑
  const result = filterConditions.find(([condition, handler]) => condition.fn == fieldName && condition.fv == fieldVal)
  result && result[1]()
}


// 处理: 作业分类1 + 作业分类2
function processClassLevel2(options) {
  console.log(2)
  let {kvs, target, source} = options
  let selectedVals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])
  
  const filterConditions = [
    [
      {combinations: ["作業1-2", "作業2-1"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = {
              workPlaceClass3: () => target[key] = getElByRange("1~2", source[key]),
              workClass1: () => target[key] = getElByRange(2, source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      {combinations: ["作業1-2", "作業2-2"]},
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
      {combinations: ["作業1-3", "作業2-1"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = {
              workPlaceClass2: () => target[key] = getElByRange("1~2", source[key]),
              workClass1: () => target[key] = getElByRange(3, source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      {combinations: ["作業1-3", "作業2-2"]},
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
                /(workPlaceClass3)|(workPlaceClass4)|(workPlaceClass5)|(workPlaceClass6)|(workClass2)/,
                () => (target[key] = getElByRange(2, source[key]))
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
      {combinations: ["作業1-4", "作業2-1"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = {
              workPlaceClass3: () => target[key] = getElByRange("1|3", source[key]),
              workClass1: () => target[key] = getElByRange(4, source[key])
            }

            mapping[key] 
              ? mapping[key]()
              : target[key] = getElByRange(1, source[key])
          }
        }
      }
    ],
    [
      {combinations: ["作業1-4", "作業2-2"]},
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
      {combinations: ["作業1-4", "作業2-3"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workClass3)|(workClass5)/,
                () => {
                  target[key] = getElByRange("$2", source[key])
                }
              ],
              [
                /(workPlaceClass3)/,
                () => {
                  target[key] = getElByRange(2, source[key])
                }
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

  const result = filterConditions.find(([condition, handler]) => condition.combinations.every((item, index) => (item == selectedVals[index])))
  result && result[1]()
}


// 处理: 作业分类1 + 作业分类2 + 作业分类3
function processClassLevel3(options) {
  console.log(3)

  let {kvs, target, source} = options
  let selectedVals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  const filterConditions = [
    [
      {combinations: ["作業1-3", "作業2-2", "作業3-2"]},
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
                  target[key] = getElByRange("$2", source[key])
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
              : target[key] = getElByRange(2, source[key])
          }
        }
      }
    ],
    [
      {combinations: ["作業1-3", "作業2-2", "作業3-3"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)|(workClass5)|(workClass6)/,
                () => {
                  target[key] = getElByRange(">1", source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange(3, source[key])
                }
              ],
              [
                /(workClass3)|(workClass4)/,
                () => {
                  target[key] = getElByRange(">2", source[key])
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
      {combinations: ["作業1-4", "作業2-3", "作業3-2"]},
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
                () => {
                  target[key] = getElByRange(2, source[key])
                }
              ],
              [
                /(workClass5)/,
                () => {
                  target[key] = getElByRange(3, source[key])
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
    [
      {combinations: ["作業1-4", "作業2-3", "作業3-3"]},
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
                /(workClass5)/,
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

  // 找到符合的条件项并执行逻辑
  const result = filterConditions.find(([condition, handler]) => condition.combinations.every((item, index) => (item == selectedVals[index])))
  result && result[1]()
}


// 处理: 作业分类1 + 作业分类2 + 作业分类3 + 作业分类4 T
function processClassLevel4(options) {
  console.log(4)
  let {kvs, target, source} = options
  let selectedVals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])

  console.log("selectedVals: ", selectedVals)


  const filterConditions = [
    [
      {combinations: ["作業1-3", "作業2-2", "作業3-3", "作業4-3"]},
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
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workClass1)|(workClass4)/,
                () => {
                  target[key] = getElByRange(3, source[key])
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
      {combinations: ["作業1-3", "作業2-2", "作業3-3", "作業4-4"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workPlaceClass6)|(workClass5)|(workClass6)/,
                () => {
                  target[key] = getElByRange("$2", source[key])
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
                  target[key] = getElByRange("end", source[key])
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
  ]

  // 找到符合的条件项并执行逻辑
  const result = filterConditions.find(([condition, handler]) => condition.combinations.every((item, index) => (item == selectedVals[index])))
  result && result[1]()
}

function processClassLevel5(options) {

}

function processClassLevel6(options) {

}


// 处理: 作业分类1 + 作业场所2
function processClassPlaceLevel1(options) {
  console.log("pc")
  let {kvs, target, source} = options
  let selectedVals = kvs.reduce((pre, item) => [...pre, item.fieldVal], [])
  console.log("selectedVals: ", selectedVals)
  const filterConditions = [
    [
      {combinations: ["作業1-1", "場所2-1"]},
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
      {combinations: ["作業1-1", "場所2-2"]},
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
      {combinations: ["作業1-2", "場所2-1"]},
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
                  target[key] = getElByRange("1~2", source[key])
                }
              ],
              [
                /(workClass1)/,
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
      {combinations: ["作業1-2", "場所2-2"]},
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
      {combinations: ["作業1-3", "場所2-1"]},
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
                () => {
                  target[key] = getElByRange(3, source[key])
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
      {combinations: ["作業1-3", "場所2-2"]},
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
              ]
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
      {combinations: ["作業1-3", "場所2-3"]},
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
                /(workPlaceClass2)|(workPlaceClass6)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workClass1)/,
                () => {
                  target[key] = getElByRange(3, source[key])
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
      {combinations: ["作業1-4", "場所2-1"]},
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
                () => {
                  target[key] = getElByRange(4, source[key])
                }
              ],
              [
                /(workPlaceClass3)/,
                () => {
                  target[key] = getElByRange("1|3", source[key])
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
      {combinations: ["作業1-4", "場所2-2"]},
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
                () => {
                  target[key] = getElByRange(4, source[key])
                }
              ],
              [
                /(workClass3)/,
                () => {
                  target[key] = getElByRange("end", source[key])
                }
              ],
              [
                /(workClass4)/,
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
      {combinations: ["作業1-4", "場所2-3"]},
      () => {
        let filterTargets = [
          "workPlaceClass2", "workPlaceClass3", "workPlaceClass4", "workPlaceClass5", "workPlaceClass6",
          "workClass1", "workClass2", "workClass3", "workClass4", "workClass5", "workClass6"
        ]

        for(let key in source) {
          if(filterTargets.includes(key)) {
            let mapping = new Map([
              [
                /(workPlaceClass2)|(workClass1)|(workClass4)/,
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
  const result = filterConditions.find(([condition, handler]) => condition.combinations.every((item, index) => (item == selectedVals[index])))
  result && result[1]()
}

function processClassPlaceLevel2(options) {

}















// ++++++ Utils ++++++

// 根据和值 求数组中元素的下标
function findIndexes(arr, target) {
  const results = [];
  const len = arr.length;

  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < len; i++) {
      const num = arr[i];

      if (sum + num > target) {
        break;
      }

      path.push(i);
      backtrack(i + 1, sum + num, path);
      path.pop();
    }
  }

  backtrack(0, 0, []);

  return results; // [[下标1, 下标2]]
}


// 根据和值返回 相加结果的元素
function findElements(arr, target) {
  const results = [];
  const len = arr.length;
  
  function backtrack(start, sum, path) {
    if (sum === target) {
      results.push([...path]);
      return;
    }
  
    for (let i = start; i < len; i++) {
      const num = arr[i];
  
      if (sum + num > target) {
        break;
      }
  
      path.push(i);
      backtrack(i + 1, sum + num, path);
      path.pop();
    }
  }
  
  backtrack(0, 0, []);
  
  return results.map((indexes) => indexes.map((index) => arr[index])); // [[元素1, 元素2]]
}

/*
  [1,2,3,4,5,6,7,8]
  使用方法1: 5 -> [5]
  使用方法2: 3~5 -> [3,4,5]
  使用方法3: >5 -> [6,7,8]
  使用方法4: <5 -> [1,2,3,4]
  使用方法5: end -> [8]
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