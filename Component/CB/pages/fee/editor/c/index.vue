<template>
  <ContainerComponent
      page_name="会費未納状況表(会全体)"
      :header_selector_data="headerSelectData"
      :hide_header_search="false"
      :hide_export="false"
  >
    <InfoTable
        :tableData="tableData"
        :tableColumn="tableColumns"
        :subTableData="subTableData"
        :subTableColumn="subTableColumn"
        :totalTabData="totalTabData"
        :totalTableColumn="totalTableColumn"
        :showSubTab="true"
        :totalTab="true"
        @setHeaderCellMerged="setHeaderCellMerged"
    />
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../../components/layouts/custom/ContainerComponent";
import InfoTable from "../../../../components/layouts/custom/InfoTable";

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    InfoTable
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "item",
          label: "支部",
          minWidth: 90,
        },
        {
          label: "令和元年度",
          children: [
            {
              prop: "ichi.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "ichi.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "令和2元年度",
          children: [
            {
              prop: "ni.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "ni.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "令和3元年度",
          children: [
            {
              prop: "san.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "san.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "合計",
          children: [
            {
              prop: "goukei.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "goukei.amount",
              label: "金額計",
              minWidth: 110
            },
          ]
        },
      ],
      tableData: [
        {
          item: "千葉",
          ichi: {
            no: "",
            amount: ""
          },
          ni: {
            no: "1",
            amount: "60,000"
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "1",
            amount: "60,000"
          }
        },
        {
          item: "船橋",
          ichi: {
            no: "2",
            amount: "144,000"
          },
          ni: {
            no: "4",
            amount: "312,000"
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "6",
            amount: "456,000"
          }
        },
        {
          item: "東葛",
          ichi: {
            no: "1",
            amount: "144,000"
          },
          ni: {
            no: "4",
            amount: "240,000"
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "5",
            amount: "284,000"
          }
        },
        {
          item: "木更津",
          ichi: {
            no: "",
            amount: ""
          },
          ni: {
            no: "",
            amount: ""
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "",
            amount: ""
          }
        },
        {
          item: "北総",
          ichi: {
            no: "",
            amount: ""
          },
          ni: {
            no: "",
            amount: ""
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "",
            amount: ""
          }
        },
        {
          item: "年度合計",
          ichi: {
            no: "3",
            amount: "168,000"
          },
          ni: {
            no: "9",
            amount: "612,000"
          },
          san: {
            no: "",
            amount: ""
          },
          goukei: {
            no: "12",
            amount: "800,000"
          }
        },
      ],
      subTableData: [
        {
          item: "退会者",
          ichi: {
            no: "",
            amound: ""
          },
          ni: {
            no: "",
            amound: ""
          },
          san: {
            no: "",
            amound: ""
          },
          goukei: {
            no: "",
            amound: ""
          }
        },
        {
          item: "年度別総計",
          ichi: {
            no: "3",
            amound: "188,000"
          },
          ni: {
            no: "9",
            amound: "612,000"
          },
          san: {
            no: "",
            amound: ""
          },
          goukei: {
            no: "12",
            amound: "800,000"
          }
        },

      ],
      subTableColumn: [
        {
          prop: "item",
          label: "項目",
          minWidth: 90,
        },
        {
          label: "令和元年度",
          children: [
            {
              prop: "ichi.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "ichi.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "令和2年度",
          children: [
            {
              prop: "ni.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "ni.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "令和3年度",
          children: [
            {
              prop: "san.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "san.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "合計",
          children: [
            {
              prop: "goukei.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "goukei.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
      ],
      totalTabData: [
        {
          no: "9名",
          amound: "800,000",
          no2: "9名",
          amound2: "800,000"
        }
      ],
      totalTableColumn: [
        {
          label: "未収入金者及び退会者の総合計",
          prop: "no"
        },
        {
          label: "",
          prop: "amound"
        },
        {
          label: "本年度分を加えた総合計",
          prop: "no"
        },
        {
          label: "",
          prop: "amound"
        },
      ],
      headerSelectData: [
        {
          title: "会",
          prop: "company",
          options: [
            {
              label: "労務士会",
              value: "0",
            },
          ],
        },
      ],
    }
  },
  methods: {
    setHeaderCellMerged() {
      let target = document.querySelectorAll(".total-table .el-table__header")[0].rows[0].cells
      for(let i=0; i<target.length; i++) {
        if(i % 2 == 0) {
          if(target[i].children[0]) {
            target[i].colSpan = 2
            target[i].children[0].style.cssText = "justify-content: center;"
            target[i + 1].style.cssText = "display: none;"
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setHeaderCellMerged()
    })
  }
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
