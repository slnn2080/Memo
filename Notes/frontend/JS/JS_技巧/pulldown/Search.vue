<template>

  <v-container fluid>
    <v-row class="no-gutters">
      <v-col>
        <h1>Search组件</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkPlaceClass2"
          :items="workPlaces.workPlaceClass2"
          :label="searchFormLabel.workPlaceClass2"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkPlaceClass3"
          :items="workPlaces.workPlaceClass3"
          :label="searchFormLabel.workPlaceClass3"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkPlaceClass4"
          :items="workPlaces.workPlaceClass4"
          :label="searchFormLabel.workPlaceClass4"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkPlaceClass5"
          :items="workPlaces.workPlaceClass5"
          :label="searchFormLabel.workPlaceClass5"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkPlaceClass6"
          :items="workPlaces.workPlaceClass6"
          :label="searchFormLabel.workPlaceClass6"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass1"
          :items="workPlaces.workClass1"
          :label="searchFormLabel.workClass1"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass2"
          :items="workPlaces.workClass2"
          :label="searchFormLabel.workClass2"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass3"
          :items="workPlaces.workClass3"
          :label="searchFormLabel.workClass3"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass4"
          :items="workPlaces.workClass4"
          :label="searchFormLabel.workClass4"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass5"
          :items="workPlaces.workClass5"
          :label="searchFormLabel.workClass5"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="selectedWorkClass6"
          :items="workPlaces.workClass6"
          :label="searchFormLabel.workClass6"
          outlined
          :clearable="true"
          solo
          flat
          dense
        ></v-select>
      </v-col>
    </v-row>
    <!-- 
    <v-row class="mt-8">
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业场所2:</span> {{searchForm.workPlaceClass2}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业场所3:</span> {{searchForm.workPlaceClass3}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业场所4:</span> {{searchForm.workPlaceClass4}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业场所5:</span> {{searchForm.workPlaceClass5}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业场所6:</span> {{searchForm.workPlaceClass6}}</div>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类1:</span> {{searchForm.workClass1}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类2:</span> {{searchForm.workClass2}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类3:</span> {{searchForm.workClass3}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类4:</span> {{searchForm.workClass4}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类5:</span> {{searchForm.workClass5}}</div>
      </v-col>
      <v-col cols="3">
        <div class="displayArea"><span class="hit">作业分类6:</span> {{searchForm.workClass6}}</div>
      </v-col>
    </v-row>
    -->
    <v-row class="mt-8">
      <v-col cols="3">
        <div class="listArea">作业场所2:</div>
        <div class="list">{{workPlaces.workPlaceClass2}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业场所3:</div>
        <div class="list">{{workPlaces.workPlaceClass3}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业场所4:</div>
        <div class="list">{{workPlaces.workPlaceClass4}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业场所5:</div>
        <div class="list">{{workPlaces.workPlaceClass5}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业场所6:</div>
        <div class="list">{{workPlaces.workPlaceClass6}}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <div class="listArea">作业分类1:</div>
        <div class="list">{{workPlaces.workClass1}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业分类2:</div>
        <div class="list">{{workPlaces.workClass2}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业分类3:</div>
        <div class="list">{{workPlaces.workClass3}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业分类4:</div>
        <div class="list">{{workPlaces.workClass4}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业分类5:</div>
        <div class="list">{{workPlaces.workClass5}}</div>
      </v-col>
      <v-col cols="3">
        <div class="listArea">作业分类6:</div>
        <div class="list">{{workPlaces.workClass6}}</div>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import data from "../json/data.js"
import {pulldownDispatcher, calcLevelNum} from "../utils/util.js"

export default {
  name: "Search",
  data() {
    return {
      /* 
        Class: level1: 1
        Class: level2: 1 + 2 = 3
        Class: level3: 1 + 2 + 4 = 7
        Class: level4: 1 + 2 + 4 + 8 = 15
        Class: level5: 1 + 2 + 4 + 8 + 16 = 31
        Class: level6: 1 + 2 + 4 + 8 + 16 + 32 = 63

        Place: level1: 128
        Place: level2: 128 + 256 = 384
        Place: level3: 128 + 256 + 512 = 896
        Place: level4: 128 + 256 + 512 + 1024 = 1920
        Place: level5: 128 + 256 + 512 + 1024 + 2048 = 3968
      */
      activeFlags: {
        workClass1: 0,  // 1
        workClass2: 0,  // 2
        workClass3: 0,  // 4
        workClass4: 0,  // 8
        workClass5: 0,  // 16
        workClass6: 0,  // 32
        workPlaceClass2: 0,  // 64
        workPlaceClass3: 0,  // 128
        workPlaceClass4: 0,  // 256
        workPlaceClass5: 0,  // 512
        workPlaceClass6: 0   // 1024
      },
      centerWorkPlaceAll: [],
      searchFormLabel: {
        workClass1: "作业分类1",
        workClass2: "作业分类2",
        workClass3: "作业分类3",
        workClass4: "作业分类4",
        workClass5: "作业分类5",
        workClass6: "作业分类6",
        workPlaceClass2: "作业场所2",
        workPlaceClass3: "作业场所3",
        workPlaceClass4: "作业场所4",
        workPlaceClass5: "作业场所5",
        workPlaceClass6: "作业场所6"
      },
      searchForm: {
        workClass1: null,
        workClass2: null,
        workClass3: null,
        workClass4: null,
        workClass5: null,
        workClass6: null,
        workPlaceClass2: null,
        workPlaceClass3: null,
        workPlaceClass4: null,
        workPlaceClass5: null,
        workPlaceClass6: null
      },
      workPlaces: {
        workClass1: [],
        workClass2: [],
        workClass3: [],
        workClass4: [],
        workClass5: [],
        workClass6: [],
        workPlaceClass2: [],
        workPlaceClass3: [],
        workPlaceClass4: [],
        workPlaceClass5: [],
        workPlaceClass6: []
      },
      workPlacesSource: {
        workClass1: [],
        workClass2: [],
        workClass3: [],
        workClass4: [],
        workClass5: [],
        workClass6: [],
        workPlaceClass2: [],
        workPlaceClass3: [],
        workPlaceClass4: [],
        workPlaceClass5: [],
        workPlaceClass6: []
      },
    }
  },
  mounted() {
    this.centerWorkPlaceAll = data
    // 思路: 有一个源数据workPlacesSource, 从源数据中取数据到 workPlaces 里面, 页面中展示workPlaces里面的数据
    this.workPlacesSource = this.setWorkPlaceList()
    this.initWorkPlaces()
  },
  methods: {
    // 计算几级联动
    checkLevelOfLinkage() {
      let level = 0
      for(let key in this.activeFlags) {
        level += this.activeFlags[key]
      }
      return level
    },

    // 设置联动
    setActiveLevel(fieldName) {
      this.activeFlags[fieldName] = calcLevelNum[fieldName]
    },
    // 重置联动
    resetActiveLevel(fieldName) {
      this.activeFlags[fieldName] = 0
    },

    // 过滤searchForm中null的键值对
    getSelectedVal() {
      let list = []
      for(let key in this.searchForm) {
        if(this.searchForm[key] && this.searchForm[key] != "すべて") {
          list.push({fieldName: key, fieldVal: this.searchForm[key]})
        }
      }

      return list
    },

    resetFilter() {
      this.initWorkPlaces()
    },

    resetPulldownItem(filedName) {
      this.workPlaces[filedName] = JSON.parse(JSON.stringify(this.workPlaces[filedName]))
    },

    // Tip: 取消时的val是null
    notify(fieldName, fieldVal) {
      
      // 每次notify之前恢复数据源
      // this.resetPulldownItem(fieldName)
      this.resetFilter()

      // 检查下flags数组, 判断派发几级联动
      let level = this.checkLevelOfLinkage()

      // 当我们选择的是 全部 或者 取消选择后 要重置过滤器, 如果不是的话则派发过滤器
      let resetFlag = ["すべて", null]

      let options = {
        level,
        kvs: this.getSelectedVal(),
        target: this.workPlaces,
        source: this.workPlacesSource,
      }

      resetFlag.includes(fieldVal)
        ? this.resetFilter()
        : pulldownDispatcher(options)
    },

    initWorkPlaces() {
      this.workPlaces = JSON.parse(JSON.stringify(this.workPlacesSource))
      for(let key in this.workPlaces) {
        if(key != "workClass1") {
          this.workPlaces[key].unshift("すべて")
        }
      }
    },

    setWorkPlaceList() {
      const list = {
        workClass1: [],
        workClass2: [],
        workClass3: [],
        workClass4: [],
        workClass5: [],
        workClass6: [],
        workPlaceClass2: [],
        workPlaceClass3: [],
        workPlaceClass4: [],
        workPlaceClass5: [],
        workPlaceClass6: []
      }

      const conditions = [
        [
          (key, value) => value && Array.isArray(list[key]) && !list[key].includes(value),
          (key, value) => list[key].push(value)
        ]
      ]

      // 作業場所・作業分類１～６の個別リストに重複しない値を設定
      this.centerWorkPlaceAll
        .forEach(o => {
          Object.entries(o).forEach(item => {
            const [key, value] = item
            const condition = conditions.find(i => i[0](key, value))
            condition && condition[1](key, value)
          })
        })

      return list
    },

    setWorkPlaceValue(filedName, newValue) {
      const allVal = "すべて"
      if (allVal === newValue) {
        this.searchForm[filedName] = ""
      } else {
        this.searchForm[filedName] = newValue
      }
    },
  },
  computed: {
    selectedWorkClass1: {
      get() {
        return this.searchForm.workClass1
      },
      set(newValue) {
        this.setWorkPlaceValue('workClass1', newValue)

        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workClass1")
        } else {
          this.setActiveLevel("workClass1")
        }

        this.notify('workClass1', newValue)
      }
    },
    // 選択作業分類２
    selectedWorkClass2: {
      get() {
        return this.searchForm.workClass2
      },
      set(newValue) {
        this.setWorkPlaceValue('workClass2', newValue)

        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workClass2")
        } else {
          this.setActiveLevel("workClass2")
        }

        this.notify('workClass2', newValue)
      }
    },
    // 選択作業分類３
    selectedWorkClass3: {
      get() {
        return this.searchForm.workClass3
      },
      set(newValue) {
        console.log("workClass3: newValue: ", newValue)

        this.setWorkPlaceValue('workClass3', newValue)

        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workClass3")
        } else {
          this.setActiveLevel("workClass3")
        }

        this.notify('workClass3', newValue)
      }
    },
    // 選択作業分類４
    selectedWorkClass4: {
      get() {
        return this.searchForm.workClass4
      },
      set(newValue) {
        console.log("workClass4: newValue: ", newValue)
        this.setWorkPlaceValue('workClass4', newValue)
        
        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workClass4")
        } else {
          this.setActiveLevel("workClass4")
        }

        this.notify('workClass4', newValue)

      }
    },
    // 選択作業分類５
    selectedWorkClass5: {
      get() {
        return this.searchForm.workClass5
      },
      set(newValue) {
        this.setWorkPlaceValue('workClass5', newValue)
        this.notify('workClass5', newValue)
      }
    },
    // 選択作業分類６
    selectedWorkClass6: {
      get() {
        return this.searchForm.workClass6
      },
      set(newValue) {
        this.setWorkPlaceValue('workClass6', newValue)
        this.notify('workClass6', newValue)
      }
    },
    // 選択作業場所分類２
    selectedWorkPlaceClass2: {
      get() {
        return this.searchForm.workPlaceClass2
      },
      set(newValue) {

        this.setWorkPlaceValue('workPlaceClass2', newValue)

        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workPlaceClass2")
        } else {
          this.setActiveLevel("workPlaceClass2")
        }
        
        this.notify('workPlaceClass2', newValue)
      }
    },
    // 選択作業場所分類３
    selectedWorkPlaceClass3: {
      get() {
        return this.searchForm.workPlaceClass3
      },
      set(newValue) {
        this.setWorkPlaceValue('workPlaceClass3', newValue)
        if(!newValue || newValue == "すべて") {
          this.resetActiveLevel("workPlaceClass3")
        } else {
          this.setActiveLevel("workPlaceClass3")
        }
        this.notify('workPlaceClass3', newValue)
      }
    },
    // 選択作業場所分類４
    selectedWorkPlaceClass4: {
      get() {
        return this.searchForm.workPlaceClass4
      },
      set(newValue) {
        this.setWorkPlaceValue('workPlaceClass4', newValue)
        this.notify('workPlaceClass4', newValue)
      }
    },
    // 選択作業場所分類５
    selectedWorkPlaceClass5: {
      get() {
        return this.searchForm.workPlaceClass5
      },
      set(newValue) {
        this.setWorkPlaceValue('workPlaceClass5', newValue)
        this.notify('workPlaceClass5', newValue)
      }
    },
    // 選択作業場所分類６
    selectedWorkPlaceClass6: {
      get() {
        return this.searchForm.workPlaceClass6
      },
      set(newValue) {
        this.setWorkPlaceValue('workPlaceClass6', newValue)
        this.notify('workPlaceClass6', newValue)
      }
    }
  }
}
</script>

<style scoped>
.displayArea {
  display: block;
  padding: 10px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
  color: #2f2f2f
}

.hit {
  color: #d0d0d0
}

.listArea {
  color: #353535
}
.list {
  padding: 10px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
  color: #C2185B;
  height: 70px;
}
</style>