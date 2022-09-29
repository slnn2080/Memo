<template>
<!--

// ControlTableShow
   容器です。ControlTableShowに入れたものの表示　と　非表示を制御します

// npm i vue-print-nb
   印刷機能
   「印刷ボタン」の中に「v-print="'#print-area'」を入れて
   <el-button v-print="'#print-area'">ラベル印刷</el-button>

   <div id="print-area">印刷エリア</div>で囲んでください
-->
  <ContainerComponent
    page_name="会員詳細"
    :hide_header_search="true"
    :hide_mail_label="false"
    :hide_pagination="true"
    :total_data="total"
    :hide_pagination="true"
  >
      <NewRegisterTest :registerData="requestList" :hide_save="true"></NewRegisterTest>
      <ControlTableShow title="欠業情況">
        <InfoTable
            :tableData="tableData.tableData1"
            :tableColumn="tableColumns1"
        ></InfoTable>
        <InfoTable
            :tableData="tableData.tableData2"
            :tableColumn="tableColumns2"
        ></InfoTable>
      </ControlTableShow>
      <ControlTableShow title="履歴">
        <div id="print-area">
          <InfoTable
              :tableData="tableData.tableData3"
              :tableColumn="resumeDataColumns"
              :hasCheck="true"
          ></InfoTable>
        </div>
      </ControlTableShow>
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../components/layouts/custom/ContainerComponent";
import ControlTableShow from "../../../components/layouts/custom/ControlTableShow";
import InfoTable from "../../../components/layouts/custom/InfoTable";
import NewRegisterTest from "../../../components/layouts/custom/NewRegisterTest";
import Vue from "vue"
import Print from "vue-print-nb"

import Mock from "mockjs";
Mock.mock("http://localhost:3200/data", {
  "list|3-5": [
    {
      flag: "@id",
      "title|+1": ["基本情報", "登録情報", "事務所等情報", "連絡先", "資格情報", "政治連盟", "その他", "口座情報", "交通費", "自宅"],
      "options|3-5": [
        {
          "subTitle|+1": ["登録番号", "氏名", "フリガナ", "生年月日", "性別", "支部", "種別", "変更年月日", "入会年月日", "登録年月日"],
          type: "input",
          prop: /[\u0041-\u005a]{5}/,
        }
      ],
    }
  ]
})

Mock.mock("http://localhost:3200/user_list", {
  list: {
    "tableData1|5-10": [
      {
        "no|+1": 1,
        "number|+1": 123,
        name: "伊藤润二",
        status: "未収",
        "money|+1": ["88,000", "90,000", "6,000", "78,000", "105,000", "2,000"],
      }
    ],
    "tableData2|5-10": [
      {
        year: /令和[0-9]年度/,
        status: "未収",
        "money|+1": ["88,000", "90,000", "6,000", "78,000", "105,000", "2,000"],
      },
    ],
    "tableData3|5-10": [
      {
        name: '田中太郎',
        date: "@date('yyyy-MM-dd')",
        point: '〇〇が〇〇に〇〇を変更',
      }
    ],
  }
})


Vue.use(Print)

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    NewRegisterTest,
    ControlTableShow,
    InfoTable
  },
  data() {
    return {
      tableColumns1: [
        {
          prop: "no",
          label: "No.",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "number",
          label: "会員番号",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "name",
          label: "お名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "status",
          label: "ステータス",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "money",
          label: "金額",
          minWidth: 100,
          sortable: true,
        },
      ],
      tableColumns2: [
        {
          prop: "year",
          label: "年度",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "status",
          label: "ステータス",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "money",
          label: "金額",
          minWidth: 100,
          sortable: true,
        },
      ],
      resumeDataColumns:[
        {
          prop: "name",
          label: "年度",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "date",
          label: "変更日",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "point",
          label: "変更点",
          minWidth: 100,
          sortable: true,
        },
      ],
      requestData: [
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
        {
          name: '田中太郎',
          date: '2012-07-03',
          point: '〇〇が〇〇に〇〇を変更',
        },
      ],
      resumeData: [],
      loadingInfo: {
        loading: true,
        obj: {},
        objKey: 0
      }
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        console.log("路径发生了变化")
        localStorage.setItem("name", "sam")
      }
    }
  },
  computed: {
    total() {
      return this.tableData?.tableData3?.length ?? 0
    }
  },
  async asyncData(ctx) {
    let {data: res} = await ctx.$axios.get("http://localhost:3200/data")
    let {data: ret} = await ctx.$axios.get("http://localhost:3200/user_list")

    return {
      requestList: res.list,
      tableData: ret.list
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn)
  },
  created() {
    this.handleTableData()
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollFn)
  },
  methods: {
    delay(init) {
      return new Promise(resolve => {
        let timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, init)
      })
    },
    scrollFn() {
      let windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let docH = document.documentElement.scrollHeight || document.body.scrollHeight

      if(this.loadingInfo.objKey >= Object.keys(this.loadingInfo.obj).length - 1) {
        this.loadingInfo.loading = false
        return
      }
      if(windowH + st >= docH) {
        this.loadingInfo.objKey++
        this.resumeData = this.resumeData.concat(this.loadingInfo.obj[this.loadingInfo.objKey])
      }
    },

    handleTableData() {
      this.loadingInfo.loading = true
      this.loadingInfo.obj = {}
      this.loadingInfo.objKey = 0

      if(this.requestData.length > 5) {
        for(let i=0; i<Math.ceil(this.requestData.length / 5); i++) {
          this.loadingInfo.obj[i] = this.requestData.slice(5*i, 5*(i+1))
        }
      } else {
        this.resumeData = this.requestData
        this.loadingInfo.loading = false
      }

      this.resumeData = this.loadingInfo.obj[this.loadingInfo.objKey]
    },
  }
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}

.search-group {
  padding: 1.25rem 1.5rem;
  display: flex;
  margin: 24px 0px;
  justify-content: space-between;
  align-items: center;
}
</style>
